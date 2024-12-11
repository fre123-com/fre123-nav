import { Layout } from '@/routers/constant'
import { RouteRecordRaw } from 'vue-router'

// 网站配置模块(多级路由全部设置为二级路由，为了缓存页面，缺点：面包屑导航栏只能获取到最后一级)
const websiteRouter: Array<RouteRecordRaw> = [
  {
    path: '/website',
    component: Layout,
    redirect: '/website/info',
    meta: {
      requiresAuth: true,
      title: '网站管理',
    },
    children: [
      {
        path: '/site/basic',
        name: 'website-basic',
        component: () => import('@/views/website/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '网站配置',
          key: 'website-basic',
        },
      },
      {
        path: '/site/surprise',
        name: 'website-surprise',
        component: () => import('@/views/surprise/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '广告配置',
          key: 'website-surprise',
        },
      },
      {
        path: '/site/friendship_link',
        name: 'website-friendship_link',
        component: () => import('@/views/friendship_link/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '友链管理',
          key: 'website-friendship_link',
        },
      },
    ],
  },
]

export default websiteRouter
