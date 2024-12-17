<template>
  <div class="header">
    <div class="header-lf flx-center">
      <CollapseIcon id="collapseIcon"></CollapseIcon>
      <Breadcrumb id="breadcrumb" v-if="themeConfig.breadcrumb"></Breadcrumb>
    </div>
    <div class="header-ri flx-center">
      <div class="header-icon">
        <!-- <SearchMenu id="searchMenu"></SearchMenu> -->
      </div>
      <!-- User name -->
      <!-- <span class="username"></span> -->
      <!-- Avatar -->
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CollapseIcon from './components/CollapseIcon.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Avatar from './components/Avatar.vue'
import { GlobalStore } from '@/store'

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
