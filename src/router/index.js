import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      meta: {keepAlive: false}, // 不需要缓存
      component: resolve => require(['../components/page/login.vue'], resolve)
    },
    /* 后台页面 */
    {
      path: '/BillManageTab',
      meta: {keepAlive: false}, // 不需要缓存
      component: resolve => require(['../components/common/layout/layout.vue'], resolve),
      children: [
        {
          path: '/BillManageTab',
          name: 'BillManageTab',
          meta: {keepAlive: false, title: '组织'},// 不需要缓存
          component: resolve => require(['../components/page/BillManageTab.vue'], resolve),
        },
      ]
    }
  ]
})
