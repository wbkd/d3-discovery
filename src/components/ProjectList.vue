<template>
  <div class="project-list">
    <ProjectItem v-for="project in projects" :key="project.name" :item="project" />
  </div>
</template>

<script>
  import ProjectItem from './ProjectItem';

  export default {
    name: 'project-list',
    props: {
      projects: Array,
    },
    components: {
      ProjectItem,
    },
  };
</script>

<style scoped lang="stylus">
  .project-list
    max-width: 960px
    margin: 0 auto

    display: grid
    grid-template-columns: repeat(auto-fit, minmax(200px, max-content))

    justify-content: space-between
    grid-gap: 1em
</style>
