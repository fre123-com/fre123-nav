<!--
 * @Description: 
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-20 14:44:11
 * @LastEditors: 叶剑鑫 yejianxin2022@dingtalk.com
 * @LastEditTime: 2024-08-22 02:23:18
-->
<template>
  <div class="content-three">
    <el-tabs type="border-card" v-model="activeTabName" @tab-click="switchTab">
      <el-tab-pane label="搜索引擎" name="search_engine">
        <SearchEngineData v-if="activeTabName === 'search_engine'"></SearchEngineData>
      </el-tab-pane>
      <el-tab-pane label="搜索引擎分类" name="search_category">
        <SearchEngineCategory v-if="activeTabName === 'search_category'"></SearchEngineCategory>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import SearchEngineCategory from "./SearchEngineCategory.vue";
import SearchEngineData from "./SearchEngineData.vue";

import { TabsPaneContext } from "element-plus";
import { ref } from "vue";

const activeTabName = ref("search_engine");
const switchTab = async (pane: TabsPaneContext, ev: Event) => {
  if (pane.paneName == activeTabName.value) {
    return;
  }
  activeTabName.value = pane.paneName as string;
};
</script>

<style lang="css">
.custom-tabs .el-tabs__item {
  font-size: 17px !important;
  font-weight: 600;
  padding: 20px 15px !important;
}

.ellipsis-text {
  display: inline-block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.custom-link {
  text-decoration: none;
  color: black;
}

.custom-link:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>
