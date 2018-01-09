<template>
  <div class="filterList container">
    <div class="filterList__inner">
      <Search class="filterList__item" :update="this.onSearchChange" />

       <Slider
        class="filterList__item"
        :slider-title="'Stars:'"
        :slider-value="stars.value"
        :options="stars.options"
        :slider-update="this.sliderStarsUpdate"
      />

      <Slider
        class="filterList__item"
        :slider-title="'Contributors:'"
        :slider-value="contributor.value"
        :options="contributor.options"
        :slider-update="this.sliderContributorUpdate"
      />

      <Dropdown class="filterList__item"
        :dropdown-title="'Latest Update:'"
        :value="this.activeUpdateFilter"
        :placeholder="'Any time'"
        :options="this.latestUpdateOptions"
        :on-change="this.onSelectLatestUpdate"
      />
      <Dropdown class="filterList__item"
        :dropdown-title="'Category:'"
        :value="this.activeUpdateFilter"
        :placeholder="'All Categories'"
        :options="this.latestUpdateOptions"
        :on-change="this.onSelectLatestUpdate"
      />
      <Dropdown class="filterList__item"
        :dropdown-title="'Version'"
        :value="this.activeUpdateFilter"
        :placeholder="'All versions'"
        :options="this.latestUpdateOptions"
        :on-change="this.onSelectLatestUpdate"
      />
      <Dropdown class="filterList__item"
        :dropdown-title="'License'"
        :value="this.activeLicenseFilter"
        :placeholder="'Any license'"
        :options="this.licenseOptions"
        :on-change="this.onLicenseFilterChanged"
      />

    </div>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import Slider from './Slider';
  import Search from '../components/Search';
  import Dropdown from '../components/Dropdown';

  export default {
    props: {
      sliderContributorUpdate: Function,
      sliderContributorValue: Array,
      sliderStarsUpdate: Function,
      sliderStarsValue: Array,
      onSearchChange: Function,
      update: Function,
      menuOpen: Boolean,
      data: Array,
      onSelectLatestUpdate: Function,
      activeUpdateFilter: String,
      latestUpdateOptions: Array,
      onLicenseFilterChanged: Function,
      licenseOptions: Array,
      activeLicenseFilter: String,
    },
    components: {
      VueSlider,
      Slider,
      Search,
      Dropdown,
    },
    data() {
      return {
        contributor: {
          value: this.sliderContributorValue,
          options: {
            min: this.sliderContributorValue[0],
            max: this.sliderContributorValue[1],
          },
        },
        stars: {
          value: this.sliderStarsValue,
          options: {
            min: this.sliderStarsValue[0],
            max: this.sliderStarsValue[1],
          },
        },
        width: 'auto',
      };
    },
  };
</script>

<style scoped lang="stylus">
  .filterList
    position: relative
    z-index: 10

  .filterList__inner
    padding: 1em 0

  @media screen and (min-width: 414px)
    .filterList__inner
      display: grid
      grid-template-columns: repeat(2, 1fr)
      grid-gap: 1em 2em
      align-items: center

  @media screen and (min-width: 768px)
    .filterList__inner
      grid-template-columns: repeat(4, 1fr)

</style>
