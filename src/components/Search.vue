<template>
  <div class="search">
    <input class="search__input" type="search" v-model="userInput" @input="onInput" placeholder="Search…" />
  </div>
</template>

<script>
  export default {
    props: {
      update: Function,
    },
    methods: {
      onInput() {
        this.update(this.userInput);
      },
    },
    data() {
      return {
        userInput: '',
      };
    },
  };
</script>

<style scoped lang="stylus">
  .search
    // width: calc(442px + 2em)
    grid-column: 1 / span 2
  .search__input
    appearance: none
    padding: 5px 8px
    width: 100%
    height: 40px
    background: #fff

    font-size: 16px
</style>
