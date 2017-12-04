<template>
  <div class="project-item">
    <div v-if="item.url !== '' ">
      <img class="project-image" v-bind:src="path" />
    </div>
    <p class="project-title">{{item.name}}</p>
    <p class="project-description">{{item.description}}</p>
    <p class="project-latest">{{item.lastUpdate}}</p>
    <p class="project-stars">*{{item.stars}}*</p>
    <p class="project-license">{{item.license}}</p>
    <a class="project-website" v-bind:href="item.url">website</a>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    computed: {
      path() {
        return require(`../../images/${this.item.name}.jpeg`);
      }
    }
  };
</script>

<style scoped lang="stylus">
  .project-image
    max-width: 100%
</style>
