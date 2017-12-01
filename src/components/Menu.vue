<template>
  <nav class="menu">
    <a class="menu-item menu-header">
      <h1>D3 Discovery</h1>
      <div>Finding D3 plugins with ease.</div>
    </a>
    <a class="menu-item">Filter by…</a>
  </nav>
</template>

<script>
  export default {

  };
</script>

<style scoped lang="stylus">
  .menu
    z-index: 0
    width: 300px
    overflow-y: hidden

  .menu-header
    padding: 2em 0
    background-color: #eee

  h1
    margin: 0
  .menu-item
    display block

</style>
