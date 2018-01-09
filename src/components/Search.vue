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
    grid-column: 1 / span 2
  .search__input
    appearance: none
    padding: 5px 8px
    width: 100%
    height: 40px

    background: rgba(238,238,238,1)
    border-radius: 2px
    border: none

    font-size: 16px
    color: #302C52
</style>
