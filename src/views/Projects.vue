<template>
  <div class="main" v-bind:class="{ 'main__menu--isvisible': menuOpen }">
    <Menu :menuOpen="menuOpen" :slider-update="onSlide" :sort-stars="onSortStars" :update="onCheck" />

    <div class="main__content">
      <header class="content__header">
        <button class="button button__menu" @click="onMenuButtonClick">☰</button>
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
      ProjectList,
    },
    data() {
      return {
        sort: null,
        search: '',
        projects: [],
        checkLicense: false,
        sliderValue: 0,
        menuOpen: false,
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
      onSearch(input) {
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

  .content__header
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 40px
    background-color: #eee
    z-index: 100

    padding: 10px

    display: flex
    justify-content: flex-start
    align-items center

  .button__menu
    height: 30px
    appearance none
    flex: 0 0 20px

  .main__menu--isvisible
    .main__content
      transform: translateX(300px)
      transition: transform .4s;
</style>
