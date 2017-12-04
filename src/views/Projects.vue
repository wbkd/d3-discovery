<template>
  <div class="main">
    <Menu :slider-update="onSlide" :sort-stars="onSortStars" :update="onCheck" />

    <div class="content">
      <header>
        <button class="button button__menu">☰</button>
        <Search :update="onSearch" />
      </header>
      <ProjectList :projects="filteredProjects" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import Menu from '../components/Menu';
  import ProjectList from '../components/ProjectList';
  import Search from '../components/Search';

  export default {
    components: {
      Menu,
      Search,
      ProjectList
    },

    data() {
      return {
        sort: null,
        search: '',
        projects: [],
        checkLicense: false,
        sliderValue: 0
      };
    },

    mounted() {
      axios.get('../../static/data.json')
        .then(response => {
          this.projects = response.data;
        })
    },

    computed: {
      filteredProjects() {
        return this.projects.filter(project => {
          const inDescr = project.description ? project.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : false;
          return project.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || inDescr;
        }).filter(project => {
          if(!this.checkLicense) return true;
          return project.license === 'MIT License';
        }).filter(project => {
          return project.stars > this.sliderValue[0] && project.stars < this.sliderValue[1];
          }
        );
      },
    },

    methods: {
      onSortStars() {
        this.projects.sort((a, b) => b.stars - a.stars);
      },
      onSearch(input) {
        this.search = input;
      },
      onCheck(input) {
        this.checkLicense = input;
      },
      onSlide(value) {
        this.sliderValue = value;
      }
    },

    asyncData({ store }) {
      return store.dispatch('getProjects');
    },
  };
</script>

<style scoped lang='stylus'>
  .content
    background-color: #4B5
    position: relative
    z-index: 1
    will-change: transform
    min-height: 100vh
    margin-left 300px
    overflow: hidden
</style>
