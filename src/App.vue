<template>
  <div id="app">
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
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono')
  *
    box-sizing: border-box

  body
    margin: 0
    padding: 0
    overflow-y: scroll

  #app
    font-family: 'Roboto Mono', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #737373
    font-size: 16px
    line-height: 1.25

  input, select, option
    font-family: 'Roboto Mono', Helvetica, Arial, sans-serif

  .container
    max-width: 1200px
    margin: 0 auto
    width: 100%
    padding: 0 1em

</style>
