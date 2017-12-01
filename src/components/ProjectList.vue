<template>
  <div class="projects-wrapper">
    <div class="project-list">
      <projectItem v-for="project in projects" :key="project.name" :item="project">
      </projectItem>
    </div>
  </div>

</template>

<script>
  import ProjectItem from './ProjectItem';

  export default {
    name: 'project-list',
    props: ['projects'],

    // define components to use in this template
    components: {
      ProjectItem,
    },
  };
</script>

<style scoped lang="stylus">
  .projects-wrapper
    flex: 1 1 100%
    z-index: 1

  .project-list
    display: grid
    grid-template-columns: repeat(4, 1fr) // 1fr 1fr 1fr
    grid-gap: 25px
    grid-auto-rows: minmax(100px, auto)
</style>
