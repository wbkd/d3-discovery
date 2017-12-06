<template>
  <transition name="slide">
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
  </transition>
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
      sliderValue: Array
    },
    components: {
      VueSlider,
      SortButton,
      CheckBox,
      Slider,
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
    position: fixed
    top: 0
    left: 0
    bottom: 0
    z-index: 10
    width: 250px
    background: #403A62
    padding: 50px 0
    color: #fff
    transition: all .4s cubic-bezier(0.770, 0.000, 0.175, 1.000)

  .menu-header
    padding: 2em 0
    color: #fff

  h1
    margin: 0

  .menu-item
    display block

  .slide-enter
    margin-left: -250px

  .slide-enter-active
    margin-left: 0px

  .slide-leave-to
    margin-left: -250px

  .slide-leave-active
    margin-left: -250px
</style>
