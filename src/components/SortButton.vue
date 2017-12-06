<template>
  <button @click="onClick">{{this.label}}</button>
</template>

<script>
  export default {
    props: {
      sortStars: Function,
      label: String,
    },
    methods: {
      onClick() {
        this.sortStars();
      },
    },
  };
</script>
