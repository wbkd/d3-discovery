<template>
  <div class="main__background">
    <div class="background__gradient"/>
    <div
      class="background__item"
      v-for="index in 40"
      :key="index"
      v-bind:style="{
        top: `${randomNumber(0, 100)}%`,
        left: `${randomNumber(0, 100)}%`,
        transform: `scale(${randomNumber(0, 1.5)})`,
        animationDelay: `${randomNumber(0, 5)}s`,
        animationDuration: `${randomNumber(4, 8)}s`,
        }"
    />
    <div
      class="shooting-star"
      v-for="shootingindex in 4"
      :key="shootingindex"
      v-bind:style="{
        top: `${randomNumber(0, 100)}%`,
        left: `${randomNumber(0, 100)}%`,
        animationDelay: `${randomNumber(0, 15)}s`,
      }"
    />
  </div>
</template>

<script>

  export default {
    props: {
      items: Array,
    },
    methods: {
      randomNumber(min, max) {
        return (Math.random() * (max - min)) + min;
      },
    },
  };
</script>

<style scoped lang="stylus">
  random(min, max)
	  math(math(0, 'random')*(max - min + 1) + min, 'floor')

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


  .shooting-star
    position: fixed
    z-index: 100
    width: 1px
    height: 1px
    background-color: #fff
    box-shadow: 0px 0px 1px 2px rgba(255, 255, 255, .6)
    animation-name: shootingStar
    animation-timing-function: ease-in
    animation-duration: 5s

  .background__item
    z-index: 100
    position: fixed
    width: 1px
    height: 1px
    background-color: #fff

    box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, .6)
    animation: animStar 5s ease-in infinite

  @keyframes animStar
    0%
      box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, .6)
    70%
      box-shadow: 0px 0px 2px 3px rgba(255, 255, 255, 0.1)
    100%
      box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, .6)

  @keyframes shootingStar
    0%
      left: random(0% , 100%)
      opacity: 0.5
    70%
      opacity: 0.5
    100%
      left: random(0% , 100%)
      top: random(0% , 100%)
      box-shadow: 0px 0px 2px 3px rgba(255, 255, 255, .6)
      opacity: 0
</style>
