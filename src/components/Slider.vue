<template>
  <div class="menu-slider">
    <div class="slider-title">Titel</div>
    <vue-slider v-model="value" v-bind="this.options" @input="onChange"></vue-slider>
    {{value}}
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';

  export default {
    props: {
      sliderTitle: String,
      sliderValue: Array,
      sliderUpdate: Function,
      options: Object
    },
    components: {
      VueSlider
    },
    data() {
      return {
        value: this.sliderValue
      }
    },
    methods: {
      onChange(value) {
        this.sliderUpdate(value);
      }
    }
  }
</script>
<style scoped lang="stylus">
  .menu-slider
    margin: 10px
</style>
