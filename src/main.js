import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TnD from './plugins/throttle&debounce';
Vue.config.productionTip = false;

Vue.use(TnD);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
