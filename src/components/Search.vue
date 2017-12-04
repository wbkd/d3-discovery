<template>
  <input type="text" v-model="userInput" @input="onInput" />
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
