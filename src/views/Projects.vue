<template>
  <div class="main" v-bind:class="{ 'main__menu--isvisible': menuOpen }">
    <BackgroundItems />
    <Modal :is-modal-visible="isModalVisible" :on-click="closeModal" />
    <div class="main__content">
      <Header
        :on-menu-button-click="onMenuButtonClick"
        :on-search-change="onSearchChange"
        :menu-open="menuOpen"
        :is-modal-visible="isModalVisible"
        :on-submit="showModal"
      />
      <Menu v-if="sliderContributorValue.length"
        :menu-open="menuOpen"
        :slider-contributor-update="onSlideContributor"
        :slider-contributor-value="sliderContributorValue"
        :slider-stars-update="onSlideStars"
        :slider-stars-value="sliderStarsValue"
        :sort-stars="onSortStars"
        :update="onCheck"
        :data="projects"
        :on-search-change="onSearchChange"
        :on-select-latest-update="onSelectLatestUpdate"
        :active-update-filter="activeUpdateFilter"
        :latest-update-options="Object.keys(this.latestUpdateFilterList)"
        :active-license-filter="activeLicenseFilter"
        :license-options="licenseFilters"
        :on-license-filter-changed="onSelectLicense"
      />
      <div class="content__info">
        <div class="info__filter">{{activeFilter.size ? `${activeFilter.size} filter selected`: ''}}</div>
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
  import Modal from '../components/Modal';

  export default {
    components: {
      Menu,
      ProjectList,
      Header,
      BackgroundItems,
      Modal,
    },
    data() {
      return {
        menuOpen: false,
        isModalVisible: false,
        projects: [],
        search: '',
        sliderContributorValue: [],
        sliderStarsValue: [],
        latestUpdateFilterList: {
          'This week': 604800000,
          'This month': 2628000000,
          'This year': 31536000000,
        }, // in ms
        activeUpdateFilter: '',
        licenseFilters: [],
        activeLicenseFilter: '',
        activeFilter: new Set(),
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

          this.licenseFilters = this.projects.map(d => d.license).reduce((res, license) => {
            if (res.indexOf(license) === -1 && license !== null) res.push(license);
            return res;
          }, []);
        });
    },
    computed: {
      filteredProjects() {
        return this.projects.filter((project) => {
          const inDescr = project.description ? project.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : false;
          return project.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || inDescr;
        })
        .filter((project) => {
          return project.stars > this.sliderStarsValue[0] && project.stars < this.sliderStarsValue[1];
        })
        .filter((project) => {
          return project.watchers > this.sliderContributorValue[0] && project.watchers < this.sliderContributorValue[1];
        })
        .filter((project) => {
          if (!this.activeUpdateFilter) return true;

          const now = Date.now();
          const projectUpdate = Date.parse(project.lastUpdate);
          const diff = Math.abs(now - projectUpdate);
          return diff < this.latestUpdateFilterList[this.activeUpdateFilter];
        })
        .filter((project) => {
          if (!this.activeLicenseFilter) return true;
          return project.license === this.activeLicenseFilter;
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
      onSelectLatestUpdate(event) {
        if (event.target.value !== '' && !this.activeFilter.has('latestUpdate')) {
          this.activeFilter.add('latestUpdate');
        } else {
          this.activeFilter.delete('latestUpdate');
        }

        this.activeUpdateFilter = event.target.value;
      },
      onSelectLicense(event) {
        if (event.target.value !== '' && !this.activeFilter.has('licenseFilter')) {
          this.activeFilter.add('licenseFilter');
        } else {
          this.activeFilter.delete('licenseFilter');
        }
        this.activeLicenseFilter = event.target.value;
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
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
