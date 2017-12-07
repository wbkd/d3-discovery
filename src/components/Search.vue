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
    flex: 2 0 50%
    padding-right: 1em

  .search__input
    appearance: none
    padding: 5px 8px
    width: 100%
    height: 40px
    max-width 980px
    background: #fff

    font-size: 16px

  @media screen and (min-width: 786px)
    .search
      padding-right: 0
</style>
