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

  .search__input
    appearance: none
    padding: 5px 8px
    width: 90%
    height: 30px
    max-width 960px
    background: #fff

</style>
