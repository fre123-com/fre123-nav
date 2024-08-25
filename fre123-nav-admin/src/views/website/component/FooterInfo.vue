<template>
  <div class="content-five">
    <div class="footer-config">
      <el-form-item label="是否展示" style="margin-left: 10px">
        <el-switch v-model="footer.right.is_show" :active-value="1" :inactive-value="0"
          @change="saveFooterSwitch"></el-switch>
      </el-form-item>
    </div>
    <MetaTable :tableData="footer.right.list" :propList="FooterPropList" @addData="footerDialogControl"
      v-if="footer.right.list?.length" @deleteData="removeFooterItem" @editData="onEditFooter" :isDraggable="true"
      :isSetTop="isSetTop" rowKey="id" :key="footerKey" :is-loading="isLoading" :operateWidth="105"
      @confirm-drag="saveDragData">
      <template #icon="{ row }">
        <img :src="row.icon" alt="icon" style="max-width: 70px; height: 70px" />
      </template>
      <template #url="{ row }">
        <a :href="row.url" target="_blank" class="custom-link">{{ row.url }}</a>
      </template>
      <template #img="{ row }">
        <img :src="row.img" alt="img" style="max-width: 70px; height: 70px" />
      </template>
      <el-table-column prop="text" />
      <template #is_show="{ row }">
        <el-switch v-model="row.is_show" :active-value="1" :inactive-value="0"
          @change="saveFooterItemSwitch(row)"></el-switch>
      </template>
    </MetaTable>
    <CommonDialog :dialog-visible="dialogVisible" :title="dialogTitle" :formData="currentFormData"
      :formRules="fieldRules" :saveHandler="currentSaveHandler" :fields="currentFormFields"
      @update:dialogVisible="(val: boolean) => (dialogVisible = val)" />
  </div>
</template>

<script setup lang="ts">
import {
  IFooterData,
  IFooterItem,
  IRequestBody,
} from "@/api/modules/website/interface";
import CommonDialog from "@/components/Common/CommonDialog.vue";
import MetaTable from "@/components/MetaTable/index.vue";
import { WebsiteStore } from "@/store/modules/website";
import { errorMessage, successMessage } from "@/utils/notifications";
import { footerFields } from "@/views/website/config/formConfig";
import { FooterPropList } from "@/views/website/config/tableConfig";
import {
  currentFormData,
  currentFormFields,
  currentSaveHandler,
  dialogTitle,
  dialogVisible,
  fieldRules,
  updateWebsite,
} from "@/views/website/index";
import { onMounted, reactive, ref } from "vue";
import { TabType } from "../interface";

const footerKey = ref(0);
const isLoading = ref(false);
const isSetTop = ref(false);
const footer = ref<IFooterData>({
  right: { is_show: 0, list: [] },
});

const reloadFooter = async () => {
  isLoading.value = true;
  await fetchData();
  isLoading.value = false;
};

const refresh = () => {
  reloadFooter();
  successMessage("刷新成功");
};
defineExpose({ refresh });

const fetchData = async () => {
  footer.value = await WebsiteStore().getWebsiteConfig<IFooterData>(TabType.Footer);
};

const updateFooter = async () => {
  try {
    isLoading.value = true;
    const requestBody = ref<IRequestBody>({
      type: TabType.Footer,
      data: footer.value,
    });
    await updateWebsite(requestBody.value);
    await reloadFooter();
    successMessage("数据成功保存");
    isLoading.value = false;
    footerKey.value++;
  } catch (error) {
    errorMessage("更新失败");
  }
};

/**
 * @name 底部链接拖拽方法逻辑实现
 */

const saveDragData = async (list: any) => {
  footer.value.right.list = list;
  await updateFooter();
};

/**
 * @name 新增Footer配置
 */
const initFooterItem = (): IFooterItem => {
  return {
    is_show: 0,
    icon: "",
    icon_class: "",
    icon_size: 0,
    url: "",
    img: "",
    text: "",
  };
};
const currentFooterItem: IFooterItem = reactive(initFooterItem());

const footerDialogControl = () => {
  dialogTitle.value = "新增底部更多链接";
  currentFormData.value = currentFooterItem;
  currentSaveHandler.value = addFooterItem;
  currentFormFields.value = footerFields;
  dialogVisible.value = true;
};

const addFooterItem = async () => {
  footer.value.right.list.push({ ...currentFooterItem });
  Object.assign(currentFooterItem, initFooterItem());
  dialogVisible.value = false;
  await updateFooter();
};

/**
 * @name 删除Footer配置
 */

const removeFooterItem = async (row: any) => {
  const index = footer.value.right.list.findIndex((item: any) => item === row);
  if (index !== -1) {
    footer.value.right.list.splice(index, 1);
    await updateFooter();
  } else {
    console.error("未找到要删除的项");
  }
};

/**
 * @name 修改Footer配置
 */

const currentFooterIndex = ref<number | null>(null);

const onEditFooter = (row: IFooterItem) => {
  Object.assign(currentFooterItem, { ...row });
  currentFooterIndex.value = footer.value.right.list.findIndex(
    (item) => item === row
  );
  copyFooterFunction();
};

const copyFooterFunction = () => {
  dialogTitle.value = "编辑底部链接";
  currentFormData.value = currentFooterItem;
  currentSaveHandler.value = saveFooterItem;
  currentFormFields.value = footerFields;
  dialogVisible.value = true;
};

const saveFooterItem = async () => {
  if (currentFooterIndex.value !== null) {
    footer.value.right.list[currentFooterIndex.value] = { ...currentFooterItem };
  }
  dialogVisible.value = false;
  Object.assign(currentFooterItem, initFooterItem());
  await updateFooter();
};

const saveFooterSwitch = async () => {
  if (!footer.value.right.list) {
    return;
  }
  await updateFooter();
};

const saveFooterItemSwitch = async (row: IFooterItem) => {
  if (!row.url) {
    return;
  }
  await updateFooter();
};


onMounted(async () => {
  isLoading.value = true;
  await reloadFooter();
  isLoading.value = false;
});
</script>

<style lang="css">
.custom-link {
  text-decoration: none;
  color: black;
}

.custom-link:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>
