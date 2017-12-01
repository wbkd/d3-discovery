<template>
  <div class="project-item">
    <p class="project-title">{{item.name}}</p>
    <p class="project-description">{{item.description}}</p>
    <p class="project-latest">{{item.lastUpdate}}</p>
    <p class="project-license">{{item.license}}</p>
    <a class="project-website" v-bind:href="item.url">website</a>
  </div>
</template>

<script>
  export default {
    props: ['item'],
  };
</script>

<style scoped lang="stylus">

</style>
