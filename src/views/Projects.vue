<template>
  <div class="projects">
    <Menu />
    <ProjectList :projects="projects" />
  </div>
</template>

<script>
  import Menu from '../components/Menu';
  import ProjectList from '../components/ProjectList';
  import repoData from '../../static/data.json';

  // eslint-disable-next-line
  console.log(repoData);

  export default {
    components: {
      Menu,
      ProjectList,
    },

    data() {
      return {
        projects: repoData,
      };
    },

    asyncData({ store }) {
      return store.dispatch('getProjects');
    },
  };
</script>

<style scoped lang='stylus'>
  .projects
    display: flex
    flex-flow: row nowrap
    align-items: stretch
    height 100vh
</style>
