<template>
  <input type="checkbox" v-model="userInput" @change="onCheck" />
</template>

<script>
  export default {
    props: {
      update: Function,
    },
    methods: {
      onCheck() {
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
