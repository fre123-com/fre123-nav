<!--
 * @Description: 
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-21 14:30:58
 * @LastEditors: 叶剑鑫 yejianxin2022@dingtalk.com
 * @LastEditTime: 2024-08-22 15:13:23
-->
<template>
  <CommentWrapper>
    <!-- 板块选择 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="类别管理" name="type"></el-tab-pane>
      <el-tab-pane label="网址管理" name="web"></el-tab-pane>
    </el-tabs>

    <!-- 类别表格 -->
    <TypeTable
      :table-list="typeDataShow"
      :prop-list="typeList"
      :loading="loading"
      v-if="activeName === 'type'"
    />

    <!-- 网址表格板块 -->
    <WebTable
      :prop-list="urlList"
      :form-items="urlTop"
      :table-list="rowDataShow"
      :loading="loading"
      v-if="activeName === 'web'"
    />
  </CommentWrapper>
</template>

<script setup lang="ts">
import {
  activeName,
  friendshipLinkApi,
  loading,
  rowDataShow,
  tabActiveName,
  tabName,
  typeDataShow,
} from "@/views/friendship_link";
import TypeTable from "@/views/friendship_link/components/TypeTable.vue";
import WebTable from "@/views/friendship_link/components/WebTable.vue";
import {
  typeList,
  urlList,
  urlTop,
} from "@/views/friendship_link/config/friendshipTop";
import { onMounted } from "vue";
import "./index.css";

// 植入获取本地初始数据
onMounted(async () => {
  loading.value = true;
  activeName.value = "type";
  tabActiveName.value = "全部";
  tabName.value = "全部";
  await friendshipLinkApi.getApiData(); // 确保能够正确调用并初始化数据
  loading.value = false;
  friendshipLinkApi.handleTabClickUse();
});
</script>
