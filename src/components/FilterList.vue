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

      <Dropdown
        class="filterList__item"
        :dropdown-title="'Latest Update:'"
        :value="this.activeUpdateFilter"
        :placeholder="'Any time'"
        :options="this.latestUpdateOptions"
        :on-change="this.onSelectLatestUpdate"
      />
      <Dropdown
        class="filterList__item"
        :dropdown-title="'Category:'"
        :value="this.activeUpdateFilter"
        :placeholder="'All Categories'"
        :options="this.categoryOptions"
        :on-change="this.onCategoryFilterChanged"
      />
      <Dropdown
        class="filterList__item"
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
import VueSlider from "vue-slider-component";
import Slider from "./Slider";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";

export default {
  props: {
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
    onCategoryFilterChanged: Function,
    categoryOptions: Array,
    activeCategoryFilter: String
  },
  components: {
    VueSlider,
    Slider,
    Search,
    Dropdown
  },
  data() {
    return {
      stars: {
        value: [2, 10000],
        options: {
          min: 2,
          max: 10000
        }
      },
      width: "auto"
    };
  }
};
</script>

<style scoped lang="stylus">
.filterList
  position: relative
  z-index: 10

.filterList__inner
  padding: 0

.filterList__item
  margin: 1em 0

@media screen and (min-width: 414px)
  .filterList__inner
    padding: 1em 0
    display: grid
    grid-template-columns: repeat(2, 1fr)
    grid-gap: 1em 2em
    align-items: center

  .filterList__item
    margin: 0

@media screen and (min-width: 768px)
  .filterList__inner
    grid-template-columns: repeat(4, 1fr)
</style>
