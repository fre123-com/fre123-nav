<template>
  <div class="logo flx-center">
    <img src="@/assets/images/logo-now.png" alt="logo" />
    <span v-show="!isCollapse"
      >FRE123<a
        href="https://github.com/fre123-com/fre123-nav/tree/main"
        target="_blank"
        class="ml-2 text-xs no-underline text-[#000]"
        >v0.1.0</a
      ></span
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>()
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>
