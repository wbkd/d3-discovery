<template>
  <nav class="menu" v-if="this.menuOpen">
    <a class="menu-item menu-header">
      <h1>D3 Discovery</h1>
      <div>Finding D3 plugins with ease.</div>
    </a>

    <SortButton :sort-stars="this.sortStars" :label="'Sort By Stars'" />
    <CheckBox :update="this.update" />
    <Slider
      :slider-title="'Filter by Stars...'"
      :slider-value="value"
      :options="options"
      :slider-update="this.sliderUpdate"
    />
  </nav>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import SortButton from './SortButton';
  import CheckBox from './CheckBox';
  import Slider from './Slider';

  export default {
    props: {
      sliderUpdate: Function,
      sortStars: Function,
      update: Function,
      menuOpen: Boolean,
    },
    components: {
      VueSlider,
      SortButton,
      CheckBox,
      Slider,
    },
    data() {
      return {
        value: [0, 5000],
        options: {
          min: 0,
          max: 5000,
          tooltip: false,
        },
        width: 'auto',
      };
    }
  };
</script>

<style scoped lang="stylus">
  .menu
    position: fixed
    top: 0
    left: 0
    height: 100vh
    z-index: 0
    width: 300px
    background: #403A62
    padding: 50px 0
    transition: transform .4s;
    color: #fff

  .menu-header
    padding: 2em 0
    color: #fff

  h1
    margin: 0

  .menu-item
    display block

</style>
