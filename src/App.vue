<template>
  <div id="app">
    <div id="bg">
      <div id="layer1" />
      <div id="layer2" />
      <div id="layer3" />
    </div>
    <Projects />
  </div>
</template>


<script>
import Projects from './views/Projects';

export default {
  name: 'app',
  components: {
    Projects,
  },
};
</script>

<style lang='stylus'>
  @import url('https://fonts.googleapis.com/css?family=Lato:400')
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:500,700')

  bgurl = url(/static/images/bg.png)
  bgspeed = 60s

  *
    box-sizing: border-box

  body
    margin: 0
    padding: 0
    overflow-y: scroll
    background-image: linear-gradient(-180deg, #3C3863 3%, #0A081E 96%)
    background-attachment: fixed

#bg
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh

  div
    position: fixed;
    top: 0;
    left: 0;
    min-width: 1600px;
    width: 200vw;
    height: 100vh;
    background-image: bgurl

  #layer1
    background-size: 200px
    animation: move bgspeed*4 linear infinite

  #layer2
    background-size: 400px
    animation: move bgspeed*2 linear infinite

  #layer3
    background-size: 800px
    animation: move bgspeed linear infinite



@keyframes move
  0%
    transform: translate3d(0,0,0)
  100%
    transform: translate3d(-800px,0,0)


#app
    font-family: 'Source Code Pro', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #555
    font-weight: 500
    font-size: 16px
    line-height: 1.25

  input, select, option
    font-family: 'Source Code Pro', Helvetica, Arial, sans-serif

  .container
    max-width: 1200px
    margin: 0 auto
    width: 100%
    padding: 0 1.5em

  @media screen and (min-width: 768px)
    .container
      padding: 0 1em
</style>
