<template>
  <div class="histogram">
    <div class="histogram-title">Test Histogram</div>
    <div v-for="(bar, index) in dataHistogram">
      <div class="bar" v-bind:style="{width: bar*5+'px'}">
        <!-- {{index + 1}}:{{bar}} -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Array,
      maxValue: Number,
      minValue: Number
    },
    data() {
      return {
        bars: [1, 5, 1, 4, 5],
        max: 5,
        min: 1
      }
    },
    computed: {
      histogram() {
        const array = Array(this.max).fill(0);
        this.bars.map(d => {
          return array[d-1] += 1;
        });
        return array;
      },
      dataHistogram() {
        const factor = 120;
        const array = Array(Math.round(this.maxValue / factor)).fill(0);
        this.data.map(d => {
          return array[Math.round(d.stars / factor) - 1] += 1;
        });
        return array;
      }
    }
  }
</script>
<style scoped lang="stylus">
  .histogram
    margin: 10px

    .bar
      height: 2px
      background: black
      font-size: 6px
</style>
