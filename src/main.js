// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

import App from './App';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
