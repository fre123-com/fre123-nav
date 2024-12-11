<template>
  <div class="content-three">
    <el-tabs type="border-card" v-model="activeTabName" @tab-click="switchTab">
      <el-tab-pane label="链接" name="right_data">
        <RightData v-if="activeTabName === 'right_data'"></RightData>
      </el-tab-pane>
      <el-tab-pane label="链接组" name="right_category">
        <RightCategory
          v-if="activeTabName === 'right_category'"
        ></RightCategory>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RightCategory from './Category.vue'
import RightData from './Data.vue'
import { TabsPaneContext } from 'element-plus'

const activeTabName = ref('right_data')
const switchTab = async (pane: TabsPaneContext, ev: Event) => {
  if (pane.paneName == activeTabName.value) {
    return
  }
  activeTabName.value = pane.paneName as string
}
</script>

<style lang="css">
.ellipsis-text {
  display: inline-block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
