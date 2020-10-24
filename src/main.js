import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
import 'u-reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
