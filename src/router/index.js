import Vue from 'vue';
import Router from 'vue-router';
import Projects from '../views/Projects';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Projects,
    },
  ],
});
