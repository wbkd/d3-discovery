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
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(220px, max-content))

    justify-content: start
    grid-gap: 1em 2em
</style>
