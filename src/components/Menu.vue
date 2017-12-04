<template>
  <nav class="menu">
    <a class="menu-item menu-header">
      <h1>D3 Discovery</h1>
      <div>Finding D3 plugins with ease.</div>
    </a>
    <span class="menu-item">Filter by Stars</span>

    <SortButton :sort-stars="this.sortStars" :label="'Sort By Stars'" />
    <CheckBox :update="this.update" />

    <vue-slider v-model="value" v-bind="options" @input="onChange"></vue-slider>
    {{value}}
  </nav>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import SortButton from './SortButton';
  import CheckBox from './CheckBox';

  export default {
    props: [
      'slider-update',
      'sort-stars',
      'update'
    ],

    components: {
      VueSlider,
      SortButton,
      CheckBox
    },

    data() {
      return {
        value: [0, 5000],
        options: {
          min: 0,
          max: 5000,
          tooltip: false
        }
      }
    },
    methods: {
      onChange(value) {
        this.sliderUpdate(value);
      }
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
    overflow-y: scroll

  .menu-header
    padding: 2em 0
    background-color: #eee

  h1
    margin: 0

  .menu-item
    display block

</style>
