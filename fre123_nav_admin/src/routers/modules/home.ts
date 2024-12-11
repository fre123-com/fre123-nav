import { Layout } from "@/routers/constant";
import { RouteRecordRaw } from "vue-router";

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: "/home",
    component: Layout,
    meta: {
      title: "首页",
      requiresAuth: true,
    },
    redirect: "/home/index",
    children: [
      {
        path: "/home/index",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "首页",
          key: "home",
        },
      },
    ],
  },
];

export default homeRouter;
