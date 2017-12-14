<template>
  <div class="menu">
    <div class="menu__inner">
      <Search class="menu__item" :update="this.onSearchChange" />

      <Slider
        class="menu__item"
        :slider-title="'Contributors:'"
        :slider-value="value"
        :options="options"
        :slider-update="this.sliderUpdate"
      />

      <Slider
        class="menu__item"
        :slider-title="'Stars:'"
        :slider-value="value"
        :options="options"
        :slider-update="this.sliderUpdate"
      />
      <Dropdown class="menu__item" />
      <Dropdown class="menu__item" />
      <Dropdown class="menu__item" />
      <Dropdown class="menu__item" />
      <!-- <SortButton :sort-stars="this.sortStars" :label="'Sort By Stars'" />
      <CheckBox :update="this.update" /> -->
      <!-- <Histogram :data="this.data" :max-value="sliderValue[1]" :min-value="sliderValue[0]" /> -->
    </div>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import SortButton from './SortButton';
  import CheckBox from './CheckBox';
  import Slider from './Slider';
  import Histogram from './Histogram';
  import Search from '../components/Search';
  import Dropdown from '../components/Dropdown';

  export default {
    props: {
      sliderUpdate: Function,
      sortStars: Function,
      update: Function,
      menuOpen: Boolean,
      sliderValue: Array,
      data: Array,
    },
    components: {
      VueSlider,
      SortButton,
      CheckBox,
      Slider,
      Histogram,
      Search,
      Dropdown,
    },
    data() {
      return {
        value: this.sliderValue,
        options: {
          min: this.sliderValue[0],
          max: this.sliderValue[1],
          tooltip: false,
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
