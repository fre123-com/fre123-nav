import { Layout } from "@/routers/constant";
import { RouteRecordRaw } from "vue-router";

// 网站配置模块(多级路由全部设置为二级路由，为了缓存页面，缺点：面包屑导航栏只能获取到最后一级)
const websiteRouter: Array<RouteRecordRaw> = [
  {
    path: "/nav",
    component: Layout,
    redirect: "/nav/index",
    meta: {
      requiresAuth: true,
      title: "导航管理",
    },
    children: [
      {
        path: "/nav/site",
        name: "nav-site",
        component: () => import("@/views/nav_site/index.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "网址管理",
          key: "nav-site",
        },
      },
      {
        path: "/nav/category",
        name: "nav-category",
        component: () => import("@/views/nav_category/index.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "分类管理",
          key: "nav-category",
        },
      },
    ],
  },
];

export default websiteRouter;
