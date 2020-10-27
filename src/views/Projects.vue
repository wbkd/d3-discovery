<template>
  <div class="main">
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
          <SortButton :label="'Name'" :handler="this.onSortBy" :sort-key="'name'" v-bind:is-active="this.activeSortKey === 'name'" v-bind:sortAsc="this.sortAsc" />
          <SortButton :label="'Stars'" :handler="this.onSortBy" :sort-key="'stars'" v-bind:is-active="this.activeSortKey === 'stars'" v-bind:sortAsc="this.sortAsc" />
          <SortButton :label="'Latest Update'" :handler="this.onSortBy" :sort-key="'lastUpdate'" v-bind:is-active="this.activeSortKey === 'lastUpdate'" v-bind:sortAsc="this.sortAsc" />
        </div>

        <div class="info__search">{{filteredProjects.length || 0}} plugins found</div>
      </div>

      <ProjectList :projects="filteredProjects" />
      <div v-if="!projects.length">
        loading data ...
      </div>
      <div v-else-if="!filteredProjects.length">
        no plugins found
      </div>
    </div>
    <footer class="footer">Made by <a href="https://webkid.io" target="_blank">webkid</a></footer>

  </div>
</template>

<script>
  import axios from 'axios';

  import FilterList from '../components/FilterList';
  import MainHeader from '../components/MainHeader';
  import ProjectList from '../components/ProjectList';
  import Modal from '../components/Modal';
  import SortButton from '../components/SortButton';

  import { inRange, byDate, searchBy, uniqueByKey } from '../utils/filter';
  import { capitalizeFirstLetter } from '../utils/strings';

  export default {
    components: {
      FilterList,
      ProjectList,
      MainHeader,
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
        sortAsc: false,
        activeSortKey: 'name',
        categoryFilters: [],
        activeCategoryFilter: '',
      };
    },
    mounted() {
      axios.get('https://d3-discovery-api.netlify.app/projects.json')
        .then((response) => {
          this.projects = response.data;

          this.sliderContributorValue = [Math.min(...this.projects.map(d => d.contributors)), 100];
          this.sliderStarsValue = [Math.min(...this.projects.map(d => d.stars)), 10000];

          this.licenseFilters = uniqueByKey(this.projects, 'license')
            .sort((a, b) => a.localeCompare(b));

          this.categoryFilters = uniqueByKey(this.projects, 'category')
            .map(d => capitalizeFirstLetter(d))
            .sort((a, b) => a.localeCompare(b));

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
          .filter((project) => {
            const update = project.lastUpdate ? project.lastUpdate.trim() : null;
            return !this.activeUpdateFilter ||
             byDate(now, update, this.latestUpdateFilterList[this.activeUpdateFilter.trim()]);
          })
          .filter((project) => {
            const license = project.license ? project.license.trim() : null;
            return !this.activeLicenseFilter || license === this.activeLicenseFilter.trim();
          })
          .filter((project) => {
            const category = project.category ? project.category.trim() : null;
            return !this.activeCategoryFilter || (category || '').toLowerCase() === (this.activeCategoryFilter.trim() || '').toLowerCase();
          });
      },
    },
    methods: {
      onSortBy(sortKey) {
        if (this.activeSortKey === sortKey) {
          this.sortAsc = !this.sortAsc;
        }

        this.activeSortKey = sortKey;
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
            this.projects.sort((a, b) =>
              (this.sortAsc ?
                a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey])));
            break;
        }
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
        this.activeUpdateFilter = event.target.value;
      },
      onSelectLicense(event) {
        this.activeLicenseFilter = event.target.value;
      },
      onSelectCategory(event) {
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
