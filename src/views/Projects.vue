<template>
  <div class="main">
    <BackgroundItems />
    <Modal :is-modal-visible="isModalVisible" :on-click="closeModal" />
    <div class="main__content">
      <MainHeader
        :on-search-change="onSearchChange"
        :is-modal-visible="isModalVisible"
        :on-submit="showModal"
      />
      <FilterList v-if="sliderContributorValue.length"
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
        :active-category-filter="activeCategoryFilter"
        :category-options="categoryFilters"
        :on-category-filter-changed="onSelectCategory"
      />
      <div class="content__info container">
        <div class="info__sort">
          <div class="sort__label">Sort by: </div>
          <SortButton :label="'Name'" :handler="this.onSortBy" :sort-key="'name'" v-bind:is-active="this.activeSortKey === 'name'" />
          <SortButton :label="'Stars'" :handler="this.onSortBy" :sort-key="'stars'" v-bind:is-active="this.activeSortKey === 'stars'" />
          <SortButton :label="'Latest Update'" :handler="this.onSortBy" :sort-key="'lastUpdate'" v-bind:is-active="this.activeSortKey === 'lastUpdate'" />
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

  import FilterList from '../components/FilterList';
  import MainHeader from '../components/MainHeader';
  import ProjectList from '../components/ProjectList';
  import BackgroundItems from '../components/BackgroundItems';
  import Modal from '../components/Modal';
  import SortButton from '../components/SortButton';

  import { inRange, byDate, searchBy } from '../utils/filter';

  export default {
    components: {
      FilterList,
      ProjectList,
      MainHeader,
      BackgroundItems,
      Modal,
      SortButton,
    },
    data() {
      return {
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
        categoryFilters: [],
        activeCategoryFilter: '',
      };
    },
    mounted() {
      axios.get('https://api.d3-discovery.net/api/github')
        .then((response) => {
          this.projects = response.data;

          const maxContributors = Math.max(...this.projects.map(d => d.contributors));
          const minContributors = Math.min(...this.projects.map(d => d.contributors));

          const maxStars = Math.max(...this.projects.map(d => d.stars));
          const minStars = Math.min(...this.projects.map(d => d.stars));
          this.sliderContributorValue = [minContributors, maxContributors];
          this.sliderStarsValue = [minStars, maxStars];

          this.licenseFilters = this.projects.map(d => d.license).reduce((res, license) => {
            if (res.indexOf(license) === -1 && license !== null) res.push(license);
            return res;
          }, []);

          this.categoryFilters = this.projects.map(d => d.category).reduce((res, category) => {
            if (res.indexOf(category) === -1 && category !== null && category) res.push(category);
            return res;
          }, []);

          this.onSortBy(this.activeSortKey, 'string');
        })
        .catch(error => console.log(error));
    },
    computed: {
      filteredProjects() {
        const now = Date.now();

        return this.projects
          .filter(project =>
            !this.search ||
              searchBy(
                this.search,
                [project.description, project.githubDescription, project.name, project.license],
              ),
          )
          .filter(project =>
            inRange(
              project.stars,
              this.sliderStarsValue[0],
              this.sliderStarsValue[1],
            ),
          )
          .filter(project =>
            inRange(
              project.contributors,
              this.sliderContributorValue[0],
              this.sliderContributorValue[1],
            ),
          )
          .filter(project =>
            !this.activeUpdateFilter ||
            byDate(now, project.lastUpdate, this.latestUpdateFilterList[this.activeUpdateFilter]),
          )
          .filter(project =>
            !this.activeLicenseFilter || project.license === this.activeLicenseFilter,
          )
          .filter(project =>
            !this.activeCategoryFilter || project.category === this.activeCategoryFilter);
      },
    },
    methods: {
      onSortBy(sortKey) {
        // reset sort, default to ascending sort
        if (this.activeSortKey !== sortKey) {
          this.activeSortKey = null;
          this.sortAsc = true;
        }

        switch (sortKey) {
          case 'name':
            this.projects.sort((a, b) =>
              (this.sortAsc ?
                a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey])));
            break;
          case 'stars':
            this.projects.sort((a, b) =>
              (this.sortAsc ? b.stars - a.stars : a.stars - b.stars));
            break;
          case 'lastUpdate':
            this.projects.sort((a, b) => {
              const aToDateObj = new Date(a.lastUpdate);
              const bToDateObj = new Date(b.lastUpdate);
              return (this.sortAsc ? bToDateObj - aToDateObj : aToDateObj - bToDateObj);
            });
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
      onSelectCategory(event) {
        if (event.target.value !== '' && !this.activeFilter.has('categoryFilter')) {
          this.activeFilter.add('categoryFilter');
        } else {
          this.activeFilter.delete('categoryFilter');
        }
        this.activeCategoryFilter = event.target.value;
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
    overflow: hidden

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
    padding-left: 2em
    font-size: 12px

  .info__sort
    display: flex
    align-items: center
    flex-flow: row wrap
    align-content: center
    text-align: center

  .sort__label
    margin-right: .3em
    text-align: left

  .info__search
    text-align: left
    flex-grow: 1
    font-size: 12px

  @media screen and (min-width: 498px)
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

    .info__search
    .content__info
      font-size: 14px

    .content__info
      padding-left: 1em

    .info__sort
      justify-content: flex-start

    .sort__label
      margin-right: .5em
</style>
