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
    padding: 10px 8px
    width: 100%

    background: rgba(238,238,238,1)
    border-radius: 2px
    border: none

    font-size: 13px
    color: #302C52
  
  @media screen and (min-width: 768px)
    .search__input
      font-size: 16px
</style>
