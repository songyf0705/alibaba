// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/style.css'

/* axios封装 */
import {post, get, remove, put} from './util/http'

Vue.use(ElementUI)
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$remove = remove
Vue.prototype.$put = put

Vue.config.productionTip = false

/* 访问URL */
// global.server = window.location.origin;
global.server = 'http://39.100.78.38:8080'

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
