<template>
  <div class="project-item">
    <img v-if="path" class="project-image" v-bind:src="path" />
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
        try {
          return require(`../../images/${this.item.name}.jpeg`);
        } catch(err) {
          return false;
        }
      }
    }
  };
</script>

<style scoped lang="stylus">
  .project-item
    background: #fff

    .project-image
      max-width: 100%
</style>
