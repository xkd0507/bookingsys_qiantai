// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'  //引入路由模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.use(router); //2.使用路由模块


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  //3.把router放到vue实例中
  components: { App },
  template: '<App/>'
})
