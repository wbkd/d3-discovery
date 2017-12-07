<template>
  <div class="histogram">
    <div class="histogram-title">Test Histogram</div>
    <div class="bar-container" :style="{height: (Math.max(...dataHistogram)*heightFactor)+'px'}">
      <div
        v-for="(bar, index) in dataHistogram"
        class="bar"
        v-bind:style="{height: bar === 0 ? '1px' : bar*heightFactor+'px', left: index*1.8+'px'}">
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
        min: 1,
        heightFactor: 4
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

    .bar-container
      position: relative

      .bar
        background: black
        font-size: 6px
        width: 1.8px
        float: left
        position: absolute
        bottom: 0
</style>
