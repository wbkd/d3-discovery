<template>
  <div class="header">
    <button class="button button__menu" @click="this.onMenuButtonClick">☰</button>
    <Search :update="this.onSearchChange" />
  </div>
</template>
<script>
  import Search from '../components/Search';

  export default {
    components: {
      Search,
    },
    props: {
      onMenuButtonClick: Function,
      onSearchChange: Function,
    },
  };
</script>

<style scoped lang='stylus'>
  .header
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 40px
    background-color: #eee
    z-index: 100

    padding: 10px

    display: flex
    justify-content: flex-start
    align-items center

  .button__menu
    height: 30px
    appearance none
    flex: 0 0 20px
</style>


