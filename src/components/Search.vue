<template>
  <div class="search">
    <form class="search__form">
      <input class="search__input" type="search" v-model="userInput" @input="onInput" />
    </form>
  </div>

</template>

<script>
  export default {
    props: [
      'update'
    ],
    methods: {
      onInput() {
        this.update(this.userInput);
      }
    },
    data() {
      return {
        userInput: ''
      }
    }
  };
</script>

<style scoped lang="stylus">
  .search
    flex-grow: 1
  .search__input
    background: #fff
    width: 300px
</style>
