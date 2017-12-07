<template>
  <transition name="slide">
    <nav class="menu" v-if="this.menuOpen">
      <div class="menu__inner">
        <a class="menu-item menu__header">
          <img class="menu__logo" src="../assets/tele.png" />
          <div class="menu__header__wrapper">
            <h1 class="menu__headline">D3 Discovery</h1>
            <div class="menu__subheadline">Finding D3 plugins with ease.</div>
          </div>

        </a>

        <SortButton :sort-stars="this.sortStars" :label="'Sort By Stars'" />
        <CheckBox :update="this.update" />
        <Slider
          :slider-title="'Filter by Stars...'"
          :slider-value="value"
          :options="options"
          :slider-update="this.sliderUpdate"
        />
        <Histogram :data="this.data" :max-value="sliderValue[1]" :min-value="sliderValue[0]" />
      </div>
    </nav>
  </transition>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import SortButton from './SortButton';
  import CheckBox from './CheckBox';
  import Slider from './Slider';
  import Histogram from './Histogram';

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
    background: rgba(255, 255, 255, .05)
    color: #fff
    transition: all .4s cubic-bezier(0.770, 0.000, 0.175, 1.000)

  .menu__header
    padding: 1em 0
    color: #fff
    display: flex
    flex-flow: row wrap
    align-items: flex-end
    text-align: left

  .menu__logo
    width: 30%
    height: auto
    margin-right: 1em
    align-self: baseline

  .menu__header__wrapper
    flex: 1 0 60%

  .menu__headline
    margin: 0
    text-shadow: 0 0 18px rgba(255,255,255,0.50)

  .menu__subheadline
    font-size: 14px
  .menu__inner
    padding: 1em
  .slide-enter
    margin-left: -250px

  .slide-enter-active
    margin-left: 0px

  .slide-leave-to
    margin-left: -250px

  .slide-leave-active
    margin-left: -250px

  @media screen and (min-width: 786px)
    .menu
      position: relative
      align-self: stretch
      width: 320px

    .menu__inner
      position: fixed
      width: 320px
</style>
