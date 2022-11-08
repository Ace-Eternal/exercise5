import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(ElementUI);
axios.defaults.baseURL='http://8.142.190.232:8088/service'
Vue.prototype.$http=axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
