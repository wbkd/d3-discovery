<template>
  <div class="project-list container">
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
    position: relative
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))

    grid-gap: 1.5em 2em
</style>
