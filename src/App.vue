<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>


<script>
export default {
  name: 'app',
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #737373;
    font-size: 16px;
    line-height: 1.33;
  }
</style>
