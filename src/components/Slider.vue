<template>
  <div class="slider">
    <div class="slider__title">{{sliderTitle}}</div>
    <vue-slider
      v-model="value"
      v-bind="Object.assign(this.options, this.styles)"
      @input="onChange"
    >
    </vue-slider>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';

  export default {
    props: {
      sliderTitle: String,
      sliderValue: Array,
      sliderUpdate: Function,
      options: Object,
    },
    components: {
      VueSlider,
    },
    data() {
      return {
        value: this.sliderValue,
        styles: {
          dotSize: 12,
          tooltipDir: ['bottom', 'bottom'],
          tooltipStyle: {
            background: 'none',
            border: 'none',
            color: '#CED6DC',
          },
          bgStyle: {
            backgroundColor: '#49426D',
            boxShadow: 'inset 0.2px 0.2px 2px 0px rgba(255, 255, 255 , .5)',
          },
          processStyle: {
            backgroundColor: '#49426D',
          },
        },
      };
    },
    methods: {
      onChange(value) {
        this.sliderUpdate(value);
      },
    },
  };
</script>

<style scoped lang="stylus">
  .slider
    padding-bottom: 2em
  .slider__title
    color: #CED6DC
    text-align: left

  .slider >>> .vue-slider-tooltip:before
    display: none
</style>
