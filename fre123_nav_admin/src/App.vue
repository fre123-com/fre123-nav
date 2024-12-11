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
