<!--
 * @Description: 
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-17 11:54:29
 * @LastEditors: 叶剑鑫 yejianxin2022@dingtalk.com
 * @LastEditTime: 2024-08-20 16:13:41
 * 2024-08-17 11:54:29
-->
<template>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<script setup lang="ts">
import router from "@/routers/router";
import { getToken } from "@/utils";
import { ElMessage } from "element-plus";
import { watch } from "vue";
import { useQueryProvider } from "vue-query";
import { useRoute } from "vue-router";
const route = useRoute();

useQueryProvider();

watch(
  () => route.path,
  (newPath: any) => {
    if (newPath === "/login" && getToken()) {
      window.open("/", "_self");
    }
    if (newPath !== "/login" && !getToken()) {
      ElMessage.error("登录失效！请您重新登录");
      router.replace({ path: "/login" });
    }
  }
);
</script>

<style scoped lang="scss"></style>
