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
        transform: `scale(${randomNumber(0, 1.5)})`,
        animationDelay: `${randomNumber(0, 5)}s`,
        animationDuration: `${randomNumber(4, 15)}s`,
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
  random(min, max)
	  (math(0, 'random')*(max - min + 1) + min)

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
    will-change: transform
    position: fixed
    width: 1px
    height: 1px
    background-color: #fff

    box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, .45)
    animation: animStar 5s ease-in infinite
    transition: transform random(0, 3s) ease-in-out

  @keyframes animStar
    0%
      transform: scale(1)
    50%
      transform: scale(random(1, 2))
    100%
      transform: scale(random(1, 3))
</style>
