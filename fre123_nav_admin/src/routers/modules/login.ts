import { RouteRecordRaw } from 'vue-router'

// 首页模块
const loginRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      keepAlive: false,
      requiresAuth: false,
      key: 'loginPage',
    },
  },
]

export default loginRouter
