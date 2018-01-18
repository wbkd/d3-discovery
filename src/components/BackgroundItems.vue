<template>
  <div class="main__background background__fixed">
    <div class="background__gradient background__fixed" />
    <div
      class="background__item"
      v-for="index in 20"
      :key="index"
      v-bind:style="{
        top: `${randomNumber(0, 100)}%`,
        left: `${randomNumber(0, 100)}%`,
        transform: `scale(${randomNumber(0, 2)})`
      }"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      randomNumber(min, max) {
        return (Math.random() * (max - min)) + min;
      },
    },
  };
</script>

<style scoped lang="stylus">
  .background__fixed
    position: relative
    &:before
      content: ' '
      position: fixed
      width: 100%
      height: 100%
      top: 0
      left: 0
      will-change: transform
      z-index: -1

  .main__background
    &:before
      background-color: white
      background-image: linear-gradient(-180deg, #3C3863 3%, #0A081E 96%)

  .background__gradient
    &:before
      background-image: url('../assets/stars_pattern.png')
      background-repeat: repeat

  .background__item
    position: fixed
    z-index: 101
    width: 1px
    height: 1px
    background-color: rgba(255, 255, 255, .80)

    box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, .40)
</style>
