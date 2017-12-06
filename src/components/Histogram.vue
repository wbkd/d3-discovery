<template>
  <div class="histogram">
    <div class="histogram-title">Test Histogram</div>
    {{bars}}
    <div v-for="(bar, index) in histogram">
      <div class="bar" v-bind:style="{width: bar*100+'px'}">
        {{index + 1}}:{{bar}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
      }
    }
  }
</script>
<style scoped lang="stylus">
  .histogram
    margin: 10px

    .bar
      hieght: 20px
      background: black
</style>
