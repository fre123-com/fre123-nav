<template>
  <div class="logo flx-center">
    <img
      src="https://img.fre123.com/i/2023/11/25/65619e8022505.png"
      alt="logo"
    />
    <span v-show="!isCollapse"
      >FRE123<small class="ml-2 text-sm">v0.1.0</small></span
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
