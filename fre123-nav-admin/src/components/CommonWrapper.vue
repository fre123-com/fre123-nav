<template>
  <ElScrollbar height="100%">
    <div class="flex flex-col p-4 bg-white rounded-md common-wrapper relative">
      <div class="flex justify-between">
        <div v-if="title" class="font-bold text-[1.5rem] leading-6 pb-4">
          {{ title }}
        </div>
        <slot name="aside" />
      </div>
      <slot />
    </div>
  </ElScrollbar>
</template>

<script lang="ts" setup>
defineProps<{ title?: string }>()
</script>

<style scope>
/* .el-scrollbar {
  height: 85%;
} */
.el-scrollbar__view {
  height: 100%;
}
</style>
