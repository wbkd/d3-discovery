<template>
  <div class="slider">
    <div class="slider__title">{{ sliderTitle }}</div>
    <vue-slider
      v-model="value"
      v-bind="Object.assign(this.options, this.styles)"
      @change="onChange"
    >
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  props: {
    sliderTitle: String,
    sliderValue: Array,
    sliderUpdate: Function,
    options: Object,
    sliderRange: Array
  },
  components: {
    VueSlider
  },
  data() {
    return {
      value: this.sliderValue,
      styles: {
        dotSize: 12,
        tooltipDir: ["bottom", "bottom"],
        tooltipStyle: {
          background: "none",
          border: "none",
          color: "#CED6DC"
        },
        bgStyle: {
          backgroundColor: "rgba(225, 193, 225, .16)"
        },
        processStyle: {
          backgroundColor: "rgba(225, 193, 225, .16)"
        },
      }
    };
  },
  methods: {
    onChange(value) {
      this.sliderUpdate(value);
    }
  }
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
