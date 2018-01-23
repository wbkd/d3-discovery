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
      sliderRange: Array,
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
            backgroundColor: 'rgba(225,193,225,0.16)',
          },
          processStyle: {
            backgroundColor: 'rgba(225,193,225,0.16)',
          },
          formatter: v => this.logValue(v),
        },
      };
    },
    methods: {
      onChange(value) {
        const newVal = [];
        newVal[0] = this.logValue(value[0]);
        newVal[1] = this.logValue(value[1]);
        this.sliderUpdate(newVal);
      },
      logValue(value) {
        const minpos = this.sliderValue[0];
        const maxpos = this.sliderValue[1];
        const minval = this.sliderValue[0] === 0 ? Math.log(0.00001) : Math.log(this.sliderValue[0]);
        const maxval = Math.log(this.sliderValue[1]);

        const scale = (maxval - minval) / (maxpos - minpos);
        const newVal = Math.round(Math.exp(((value - minpos) * scale) + minval));

        return newVal;
      },
    },
  };
</script>

<style scoped lang="stylus">
  .slider
    padding-bottom: 1em

  .slider__title
    color: #CED6DC
    text-align: left
    font-size: 13px

  .slider >>> .vue-slider-tooltip
    font-size: 11px

  .slider >>> .vue-slider-tooltip:before
    display: none

  @media screen and (min-width: 768px)
    .slider__title
      font-size: 16px

    .slider >>> .vue-slider-tooltip
        font-size: 14px
</style>
