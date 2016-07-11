import Vue from 'vue/dist/vue';
import mainApp from './main-component.vue';
new Vue({
  el: 'app',
  components: {
    mainApp,
  },
  template: `<main-app></main-app>`,
});
