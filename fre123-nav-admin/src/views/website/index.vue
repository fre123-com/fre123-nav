<!--
 * @Description: 
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-20 14:58:45
 * @LastEditors: 叶剑鑫 yejianxin2022@dingtalk.com
 * @LastEditTime: 2024-08-23 01:26:32
-->
<template>
  <common-wrapper>
    <div class="head-config">
      <p class="head-config-text">网站配置信息</p>
      <div class="head-config-button">
        <el-button :color="META_NORMAL" circle @click="onRefresh">
          <template #icon>
            <el-icon>
              <refresh />
            </el-icon>
          </template>
        </el-button>
      </div>
    </div>
    <div class="head-nav">
      <el-tabs
        v-model="selectedTab"
        type="card"
        class="demo-tabs"
        @tab-click="onTabClick"
      >
        <el-tab-pane
          v-for="(label, value) in tabs"
          :key="value"
          :label="label"
          :name="value"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <component :is="currentComponent" ref="currentComponentRef" />
  </common-wrapper>
</template>

<script lang="ts" setup>
import { META_NORMAL } from "@/config/const";
import { SUB_TAB_KEY_WEBSITE_CONFIG } from "@/store/modules/SelectedTab";
import { successMessage } from "@/utils/notifications";
import { useTabPersistence } from "@/utils/tabPersistence";
import { TabsPaneContext } from "element-plus";
import { computed, ref } from "vue";
import BaseInfo from "./component/BaseInfo.vue";
import FooterInfo from "./component/FooterInfo.vue";
import PendantInfo from "./component/PendantInfo.vue";
import HeaderAdvert from "./component/Right/index.vue";
import HeaderInfo from "./component/SearchEngine/index.vue";
import SeoInfo from "./component/SeoInfo.vue";
import "./index.css";
import { RefreshAbleComponent, TabType } from "./interface";

const tabs: Record<TabType, string> = {
  [TabType.Base]: "基本信息",
  [TabType.Seo]: "Seo 配置",
  [TabType.Header]: "搜索引擎管理",
  [TabType.HeaderAdvert]: "头部右侧链接组",
  [TabType.Pendant]: "侧边栏配置",
  [TabType.Footer]: "底部配置",
};

const components: Record<TabType, any> = {
  [TabType.Base]: BaseInfo,
  [TabType.Seo]: SeoInfo,
  [TabType.Header]: HeaderInfo,
  [TabType.HeaderAdvert]: HeaderAdvert,
  [TabType.Pendant]: PendantInfo,
  [TabType.Footer]: FooterInfo,
};

const { activeTabName: selectedTab, switchTab } = useTabPersistence(
  SUB_TAB_KEY_WEBSITE_CONFIG,
  TabType.Base
);

const currentComponent = computed(() => {
  return components[selectedTab.value as TabType] || BaseInfo;
});

const currentComponentRef = ref<
  (InstanceType<typeof BaseInfo> & RefreshAbleComponent) | null
>(null);

const onTabClick = async (pane: TabsPaneContext) => {
  await switchTab(pane, new Event("click"));
};

const onRefresh = () => {
  if (
    currentComponentRef.value &&
    typeof currentComponentRef.value.refresh === "function"
  ) {
    currentComponentRef.value.refresh();
  } else {
    successMessage("刷新成功");
  }
};
</script>
