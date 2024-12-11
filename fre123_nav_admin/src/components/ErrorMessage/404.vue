<template>
  <el-row>
    <el-col>
      <el-result
        class="h-screen"
        icon="warning"
        title="页面未找到"
        sub-title="请检查路径后重试或返回首页"
      >
        <template #extra>
          <el-button type="primary" @click="goBack">Back</el-button>
          <el-button type="success" @click="goUacPage">回到 AUC！</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useGoBack } from '@/hooks'
const { goBack } = useGoBack()
const goUacPage = () => {
  window.open(location.origin, '_self')
}
</script>

<style scoped lang="scss">
.h-screen {
  margin-top: 300px;
}
</style>
