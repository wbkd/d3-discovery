<template>
  <div class="main" v-bind:class="{ 'main__menu--isvisible': menuOpen }">
    <BackgroundItems />
    <div class="main__content">
      <Header :on-menu-button-click="onMenuButtonClick" :on-search-change="onSearchChange" :menu-open="menuOpen" />
        <Menu v-if="this.sliderContributorValue.length"
          :menu-open="menuOpen"
          :slider-contributor-update="onSlideContributor"
          :slider-contributor-value="this.sliderContributorValue"
          :slider-stars-update="onSlideStars"
          :slider-stars-value="this.sliderStarsValue"
          :sort-stars="onSortStars"
          :update="onCheck"
          :data="projects"
          :on-search-change="onSearchChange"
        />
      <div class="content__info">
        <div class="info__filter">No filter selected</div>
        <div class="info__search">{{filteredProjects.length || 0}} plugins found</div>
      </div>
      <ProjectList :projects="filteredProjects" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import Menu from '../components/Menu';
  import Header from '../components/Header';
  import ProjectList from '../components/ProjectList';
  import BackgroundItems from '../components/BackgroundItems';

  export default {
    components: {
      Menu,
      ProjectList,
      Header,
      BackgroundItems,
    },
    data() {
      return {
        sort: null,
        search: '',
        projects: [],
        checkLicense: false,
        sliderContributorValue: [],
        sliderStarsValue: [],
        menuOpen: window.innerWidth > 768,
      };
    },
    mounted() {
      axios.get('../../static/data.json')
        .then((response) => {
          this.projects = response.data;

          // REFACTOR: use contributors instead of watchers value
          const maxContributors = Math.max(...this.projects.map(d => d.watchers));
          const minContributors = Math.min(...this.projects.map(d => d.watchers));

          const maxStars = Math.max(...this.projects.map(d => d.stars));
          const minStars = Math.min(...this.projects.map(d => d.stars));
          this.sliderContributorValue = [minContributors, maxContributors];
          this.sliderStarsValue = [minStars, maxStars];
        });
    },
    computed: {
      filteredProjects() {
        return this.projects.filter((project) => {
          const inDescr = project.description ? project.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : false;
          return project.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || inDescr;
        })
        .filter((project) => {
          if (!this.checkLicense) return true;
          return project.license === 'MIT License';
        })
        .filter((project) => {
          return project.stars > this.sliderStarsValue[0] && project.stars < this.sliderStarsValue[1];
        })
        .filter((project) => {
          return project.watchers > this.sliderContributorValue[0] && project.watchers < this.sliderContributorValue[1];
        });
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
      onSlideContributor(value) {
        this.sliderContributorValue = value;
      },
      onSlideStars(value) {
        this.sliderStarsValue = value;
      },
      onMenuButtonClick() {
        this.menuOpen = !this.menuOpen;
      },
    },
  };
</script>

<style scoped lang='stylus'>
  .main__content
    position: relative
    min-height: 100vh
    flex-grow: 1

  .content__info
    display: flex
    justify-content: flex-start
    flex-flow: row nowrap
    max-width: 980px
    margin: 0 auto

    color: #eee
    margin-bottom: 1em

  .info__filter
  .info__search
    width: 50%

  .info__filter
    text-align: left

  .info__search
    text-align: right
  @media screen and (min-width: 786px)
    .main
      display: flex
      align-items: stretch
</style>
