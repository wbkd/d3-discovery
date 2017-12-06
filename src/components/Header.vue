<template>
  <div class="header">
    <Search :update="this.onSearchChange" />

    <div v-show="isVisible" class="button button__menu" v-bind:class="{ 'button__menu--active': this.menuOpen }" @click="this.onMenuButtonClick">
      <div class="button__menu__bar bar1"></div>
      <div class="button__menu__bar bar2"></div>
      <div class="button__menu__bar bar3"></div>
    </div>
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
      menuOpen: Boolean,
    },
    data() {
      return {
        isVisible: window.innerWidth <= 768,
      };
    },
  };
</script>

<style scoped lang='stylus'>
  .header
    position: absolute
    top: 0
    left: 0
    right: 0
    padding: 1em
    z-index: 100
    background-color: #343158

    display: flex
    justify-content: flex-start
    align-items center

  .button__menu
    flex: 0 0 auto

    display: inline-block
    cursor: pointer

  .button__menu__bar
    width: 30px
    height: 3px
    background-color: #eee
    margin: 6px 0
    transition: 0.4s

  .button__menu--active
    .bar1
      transform: rotate(-45deg) translate(-5px, 6px)
    .bar2
      opacity: 0
    .bar3
      transform: rotate(45deg) translate(-7px, -8px)

</style>


