<template>
  <div class="menu">
    <div class="menu__inner">
      <Search class="menu__item" :update="this.onSearchChange" />

      <Slider
        class="menu__item"
        :slider-title="'Contributors:'"
        :slider-value="contributor.value"
        :options="contributor.options"
        :slider-update="this.sliderContributorUpdate"
      />

       <Slider
        class="menu__item"
        :slider-title="'Stars:'"
        :slider-value="stars.value"
        :options="stars.options"
        :slider-update="this.sliderStarsUpdate"
      />

      <Dropdown class="menu__item"
        :dropdown-title="'Latest Update:'"
        :value="this.activeUpdateFilter"
        :placeholder="'Any time'"
        :options="this.latestUpdateOptions"
        :on-change="this.onSelectLatestUpdate"
      />
      <Dropdown class="menu__item"
        :dropdown-title="'Category:'"
        :value="this.activeUpdateFilter"
        :placeholder="'All Categories'"
        :options="this.latestUpdateOptions"
        :on-change="this.onSelectLatestUpdate"
      />
      <Dropdown class="menu__item"
        :dropdown-title="'Version'"
        :value="this.activeUpdateFilter"
        :placeholder="'All versions'"
        :options="this.latestUpdateOptions"
        :on-change="this.onSelectLatestUpdate"
      />
      <Dropdown class="menu__item"
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
  .menu
    position: relative
    margin: 0 auto
    z-index: 10
    width: 100%
    max-width: 980px

  .menu__inner
    padding: 1em 0

    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-gap: 1em 2em
    align-items: center
</style>
