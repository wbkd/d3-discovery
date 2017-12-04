<template>
  <button @click="onClick">{{this.label}}</button>
</template>

<script>
  export default {
    props: [
      'sort-stars',
      'label'
    ],

    methods: {
      onClick() {
        this.sortStars();
      }
    }
  };
</script>
