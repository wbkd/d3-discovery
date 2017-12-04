<template>
  <div class="main">
    <div class="input-wrapper">
      <SortButton :sort-stars="onSortStars" :label="'Sort By Stars'" />
      <Search :update="onSearch" />
      <CheckBox :update="onCheck"/>
    </div>
    <div class="projects">
      <Menu :slider-update="onSlide" />
      <ProjectList :projects="filteredProjects" />
    </div>
  </div>
</template>

<script>
  import Menu from '../components/Menu';
  import ProjectList from '../components/ProjectList';
  import SortButton from '../components/SortButton';
  import Search from '../components/Search';
  import CheckBox from '../components/CheckBox';
  import axios from 'axios';


  export default {
    components: {
      Menu,
      ProjectList,
      SortButton,
      Search,
      CheckBox
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
          return project.stars > this.sliderValue;
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
  .projects
    display: flex
    flex-flow: row nowrap
    align-items: stretch
    height 100vh

  .input-wrapper
    text-align: left
    margin-bottom: 60px
</style>
