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
      <div class="content__info container">
        <div class="info__sort">
          <div class="sort__label">Sort by: </div>
          <SortButton :label="'Name'" :handler="(val) => this.onSortBy(val, 'string')" :sort-key="'name'" v-bind:is-active="this.activeSortKey === 'name'" />
          <SortButton :label="'Stars'" :handler="(val) => this.onSortBy(val, 'number')" :sort-key="'stars'" v-bind:is-active="this.activeSortKey === 'stars'" />
        </div>

        <div class="info__search">{{filteredProjects.length || 0}} plugins found</div>
      </div>
      <ProjectList :projects="filteredProjects" />
      <div v-if="!filteredProjects.length">
        no plugins found
      </div>
    </div>
    <footer class="footer">Made with 📠 by <a href="https://webkid.io" target="_blank">webkid.io</a></footer>

  </div>
</template>

<script>
  import axios from 'axios';

  import Menu from '../components/Menu';
  import Header from '../components/Header';
  import ProjectList from '../components/ProjectList';
  import BackgroundItems from '../components/BackgroundItems';
  import Modal from '../components/Modal';
  import SortButton from '../components/SortButton';

  import { inRange, byDate, searchBy } from '../utils/filter';

  export default {
    components: {
      Menu,
      ProjectList,
      Header,
      BackgroundItems,
      Modal,
      SortButton,
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
          'Last week': 604800000,
          'Last month': 2628000000,
          'Last year': 31536000000,
        }, // in ms
        activeUpdateFilter: '',
        licenseFilters: [],
        activeLicenseFilter: '',
        activeFilter: new Set(),
        sortAsc: true,
        activeSortKey: 'name',
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
        const now = Date.now();

        return this.projects.filter(project =>
          !this.search || searchBy(this.search, [project.description, project.name, project.license]))
          .filter(project =>
            inRange(project.stars, this.sliderStarsValue[0], this.sliderStarsValue[1]))
          .filter(project =>
            inRange(project.watchers, this.sliderContributorValue[0], this.sliderContributorValue[1]))
          .filter(project =>
            !this.activeUpdateFilter
            || byDate(now, project.lastUpdate, this.latestUpdateFilterList[this.activeUpdateFilter]))
          .filter(project =>
            !this.activeLicenseFilter || project.license === this.activeLicenseFilter);
      },
    },
    methods: {
      onSortBy(sortKey, sortValueType) {
        // reset sort, default to ascending sort
        if (this.activeSortKey !== sortKey) {
          this.activeSortKey = null;
          this.sortAsc = true;
        }

        switch (sortValueType) {
          case 'string':
            this.projects.sort((a, b) =>
              (this.sortAsc ?
                a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey])));
            break;
          case 'number':
            this.projects.sort((a, b) =>
              (this.sortAsc ? b.stars - a.stars : a.stars - b.stars));
            break;
          default:
            break;
        }

        this.sortAsc = !this.sortAsc;
        this.activeSortKey = sortKey;
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
  .main
    position relative
    min-height: 100vh

  .main__content
    position: relative
    flex-grow: 1
    margin-bottom: 5em

  .content__info
    display: flex
    justify-content: flex-start
    flex-flow: row wrap
    align-items center

    color: #eee
    margin-bottom: 2em
    font-size: 14px

  .info__sort
    flex-grow: 2
    display: flex
    justify-content: flex-start
    align-items: center

  .sort__label
    margin-right .8em

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

  .footer
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    padding: 1em
    background-color: rgba(225,193,225,0.08)
    color: white
    a
      color: white


</style>
