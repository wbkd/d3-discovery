<template>
  <div class="main__background">
    <div class="background__gradient"/>
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
  .main__background
    position: fixed
    background-image: linear-gradient(-180deg, #3C3863 3%, #0A081E 96%)
    width: 100%
    height: 100%

  .background__gradient
    width: 100%
    height: 100%
    position: fixed
    background: url('../assets/stars_pattern.png')

  .background__item
    z-index: 101
    position: fixed
    width: 1px
    height: 1px
    background-color: rgba(255, 255, 255, .80)

    box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, .40)
</style>
