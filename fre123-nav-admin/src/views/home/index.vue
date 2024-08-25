<!--
 * @Description: 
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-17 11:54:29
 * @LastEditors: 叶剑鑫 yejianxin2022@dingtalk.com
 * @LastEditTime: 2024-08-20 16:14:02
 * 2024-08-17 11:54:29
-->
<template>
  <div class="home flx-center">
    <img
      class="home-bg"
      src="https://img.fre123.com/i/2024/07/05/6687bb46d72ea.png"
      alt="welcome"
    />
  </div>
</template>

<script setup lang="ts" name="home">
import router from "@/routers";
import { GlobalStore } from "@/store";
const globalStore = GlobalStore();
if (!globalStore.token) {
  router.push("/login");
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  .home-bg {
    width: 80%;
    margin-bottom: 25px;
  }
}
</style>
