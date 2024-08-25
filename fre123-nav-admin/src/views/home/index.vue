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
