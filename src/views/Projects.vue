<template>
  <div class="main">
    <div class="input-wrapper">
      <input type="text" v-model="search" />
      <button @click="sortByStars">Sort by Stars</button>
    </div>
    <div class="projects">
      <Menu />
      <ProjectList :projects="filteredProjects" />
    </div>
  </div>
</template>

<script>
  import Menu from '../components/Menu';
  import ProjectList from '../components/ProjectList';
  import repoData from '../../static/data.json';

  export default {
    components: {
      Menu,
      ProjectList,
    },

    data() {
      return {
        sort: null,
        search: '',
        projects: repoData,
      };
    },

    computed: {
      filteredProjects() {
        return this.projects.filter(project => {
          const inDescr = project.description ? project.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : false;
          return project.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || inDescr;
        })
      }
    },

    methods: {
      sortByStars() {
          this.projects.sort((a, b) => b.stars - a.stars);
      }
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

  .input-wrapper
    text-align: left
    margin-bottom: 60px
</style>
