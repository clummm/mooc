// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/'// 引入store
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'
import routerHelp from './common/js/ruoterHelp'
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
/* 全局引入ElementUI */
Vue.use(ElementUI)
/* 全局引入axios */
Vue.prototype.$http = axios
Vue.prototype.$cookies = Cookies
Vue.config.productionTip = false
Vue.prototype.rHelp = routerHelp
/* eslint-disable no-new */
new Vue({
  router,
  store, // 使用store
  render: h => h(App)
}).$mount('#app')
