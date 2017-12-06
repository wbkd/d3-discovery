<template>
  <div class="main" v-bind:class="{ 'main__menu--isvisible': menuOpen }">
    <Menu :menu-open="menuOpen" :slider-update="onSlide" :sort-stars="onSortStars" :update="onCheck" />
    <div class="main__content">
      <Header :on-menu-button-click="onMenuButtonClick" :on-search-change="onSearchChange"  :menu-open="menuOpen" />
      <ProjectList :projects="filteredProjects" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import Menu from '../components/Menu';
  import Header from '../components/Header';
  import ProjectList from '../components/ProjectList';

  export default {
    components: {
      Menu,
      ProjectList,
      Header,
    },
    data() {
      return {
        sort: null,
        search: '',
        projects: [],
        checkLicense: false,
        sliderValue: 0,
        menuOpen: true,
      };
    },
    mounted() {
      axios.get('../../static/data.json')
        .then((response) => {
          this.projects = response.data;
        });
    },
    computed: {
      filteredProjects() {
        return this.projects.filter((project) => {
          const inDescr = project.description ? project.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : false;
          return project.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || inDescr;
        }).filter((project) => {
          if (!this.checkLicense) return true;
          return project.license === 'MIT License';
        }).filter(project => project.stars > this.sliderValue[0] && project.stars < this.sliderValue[1],
        );
      },
    },
    methods: {
      onSortStars() {
        this.projects.sort((a, b) => b.stars - a.stars);
      },
      onSearchChange(input) {
        this.search = input;
      },
      onCheck(input) {
        this.checkLicense = input;
      },
      onSlide(value) {
        this.sliderValue = value;
      },
      onMenuButtonClick() {
        this.menuOpen = !this.menuOpen;
      },
    },
    asyncData({ store }) {
      return store.dispatch('getProjects');
    },
  };
</script>

<style scoped lang='stylus'>
  .main
    overflow-y: hidden
  .main__content
    background-color: #343158
    position: relative
    z-index: 1
    min-height: 100vh
    overflow: hidden
    transform: translateX(0)
    transition: transform .4s;

  .main__menu--isvisible
    .main__content
      transform: translateX(300px)
      transition: transform .4s;

</style>
