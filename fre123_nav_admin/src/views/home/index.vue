<template>
  <div class="home flx-center">
    <img class="home-bg" :src="welcomeImg" alt="welcome" />
  </div>
</template>

<script setup lang="ts" name="home">
import welcomeImg from '@/assets/images/welcome-now.png'
import router from '@/routers'
import { GlobalStore } from '@/store'
const globalStore = GlobalStore()
if (!globalStore.token) {
  router.push('/login')
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
