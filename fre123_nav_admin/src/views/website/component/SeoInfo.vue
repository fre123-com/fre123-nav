<template>
  <div class="content-one">
    <el-form style="max-width: 700px; margin: auto; font-size: larger" :model="seoForm" status-icon label-width="auto"
      class="demo-ruleForm" ref="seoFormRef">
      <el-form-item label="网站名称：" prop="title">
        <el-input v-model="seoForm.title" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item label="网站描述：" prop="description">
        <el-input v-model="seoForm.description" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item label="网站关键词：" prop="keywords">
        <el-input v-model="seoForm.keywords" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item label="百度统计ID：" prop="statistics_baidu">
        <el-input v-model="seoForm.statistics_baidu" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="saveSeoForm()"> 保存修改 </el-button>
        <el-button @click="resetSeo()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { IRequestBody, ISeo } from "@/api/modules/website/interface";
import { WebsiteStore } from "@/store/modules/website";
import { successMessage } from "@/utils/notifications";
import { showSaveNotice, updateWebsite } from "@/views/website/index";
import { onMounted, Ref, ref } from "vue";
import { TabType } from "../interface";

/**
 * @name SEO配置信息
 */

const seoForm = ref<ISeo>({
  title: "",
  description: "",
  keywords: "",
  statistics_baidu: "",
});
const seoFormRef: Ref<any> = ref(null);

const saveSeoForm = async () => {
  const requestBody = ref<IRequestBody>({
    type: TabType.Seo,
    data: seoForm.value,
  });
  await updateWebsite(requestBody.value);
  successMessage("数据成功保存");
};

const resetSeo = async () => {
  await fetchData();
};

const fetchData = async () => {
  seoForm.value = await WebsiteStore().getWebsiteConfig<ISeo>(TabType.Seo);
};

const refresh = async () => {
  await fetchData();
  successMessage("刷新成功");
};
defineExpose({ refresh });

onMounted(async () => {
  await fetchData();
});
</script>
