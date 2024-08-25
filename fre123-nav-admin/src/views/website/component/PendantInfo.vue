<template>
  <div class="content-five">
    <div class="pendant-config">
      <el-form-item label="是否展示" style="margin-left: 10px">
        <el-switch v-model="pendant.is_show" @change="handlePendentSwitch" :active-value="1"
          :inactive-value="0"></el-switch>
      </el-form-item>
    </div>
    <MetaTable :tableData="pendant.list" :propList="PendantPropList" @addData="pendantDialogControl"
      @deleteData="removeItem" @editData="onEditPendant" :isDraggable="true" :isSetTop="isSetTop" rowKey="id"
      :key="pendantKey" :operateWidth="105" :is-loading="isLoading" @confirm-drag="saveDragData">
      <el-table-column prop="icon_class" />
      <template #base64="{ row }">
        <img :src="row.base64" alt="base64" style="max-width: 70px; height: 70px" />
      </template>
      <template #img="{ row }">
        <img v-if="row.img" :src="row.img" alt="img" style="max-width: 70px; height: 70px" />
      </template>
      <el-table-column prop="text" />
      <template #url="{ row }">
        <a :href="row.url" target="_blank" class="custom-link">{{ row.url }}</a>
      </template>
      <template #is_show="{ row }">
        <el-switch v-model="row.is_show" @change="saveSwitch(row)" :active-value="1" :inactive-value="0"></el-switch>
      </template>
    </MetaTable>
    <el-dialog :title="dialogTitle" width="600" align-center :model-value="dialogVisible" @close="handleCloseDialog()">
      <el-form :model="currentFormData" :rules="fieldRules" ref="formRef" label-width="auto" class="form-style">
        <el-form-item label="图标类名" prop="icon_class" style="margin-top: 15px">
          <el-input v-model="currentFormData.icon_class"></el-input>
        </el-form-item>
        <el-form-item label="Base64图标" prop="base64">
          <el-input v-model="currentFormData.base64"></el-input>
        </el-form-item>
        <el-form-item label="Hover类型">
          <el-select v-model="typeSelect" @change="handleTypeChange">
            <el-option v-for="option in getPendantTypeOptions()" :key="option.value" :label="option.label"
              :value="parseInt(option.value, 10)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showDescription" label="文字描述" prop="text" style="margin-left: 30px">
          <el-input v-model="currentFormData.text"></el-input>
        </el-form-item>
        <el-form-item v-if="showImageUrlInput" label="图片链接" prop="img" style="margin-left: 30px">
          <el-input v-model="currentFormData.img" placeholder="请输入以http://或https://开头的链接"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="currentFormData.url"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCloseDialog()">取消</el-button>
          <el-button type="primary" @click="currentSaveHandler">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  IPendantData,
  IPendantItem,
  IRequestBody,
} from "@/api/modules/website/interface";
import MetaTable from "@/components/MetaTable/index.vue";
import { WebsiteStore } from "@/store/modules/website";
import { errorMessage, successMessage } from "@/utils/notifications";
import { PendantPropList } from "@/views/website/config/tableConfig";
import {
  currentSaveHandler,
  dialogTitle,
  dialogVisible,
  fieldRules,
  getPendantTypeOptions,
  updateWebsite,
} from "@/views/website/index";
import { onMounted, ref, Ref } from "vue";
import { TabType } from "../interface";

const pendant = ref<IPendantData>({
  is_show: 0,
  list: [] as IPendantItem[],
});

const pendantKey = ref(0);
const isLoading = ref(false);
const isSetTop = ref(false);
const reloadPendant = async () => {
  isLoading.value = true;
  await fetchData();
  pendantKey.value++;
  isLoading.value = false;
};

const refresh = () => {
  reloadPendant();
  successMessage("刷新成功");
};
defineExpose({ refresh });

const fetchData = async () => {
  pendant.value = await WebsiteStore().getWebsiteConfig<IPendantData>(TabType.Pendant);
};

const updatePendant = async () => {
  try {
    isLoading.value = true;
    const requestBody = ref<IRequestBody>({
      type: TabType.Pendant,
      data: pendant.value,
    });
    await updateWebsite(requestBody.value);
    await reloadPendant();
    successMessage("数据成功保存");
    isLoading.value = false;
    pendantKey.value++;
  } catch (error) {
    errorMessage("数据保存失败");
  }
};

/**
 * @name 侧边栏拖拽方法逻辑实现
 */

const saveDragData = async (list: any) => {
  pendant.value.list = list;
  await updatePendant();
};

/**
 * @name 新增与编辑公用弹窗的配置
 */

const formRef = ref();
const typeSelect: Ref<number> = ref(1);
const showImageUrlInput = ref(true);
const showDescription = ref(false);
// 处理类型变化的函数
const handleTypeChange = (type: number) => {
  const isImageUrlRequired = type !== 2;
  const isDescriptionRequired = type !== 1;
  showImageUrlInput.value = isImageUrlRequired;
  showDescription.value = isDescriptionRequired;
};
const initCurrenFormData = (): IPendantItem => ({
  is_show: 0,
  icon_class: "",
  icon_size: 0,
  icon_color: "",
  icon_hover_color: "",
  base64: "",
  text: "",
  img: "",
  url: "",
});
const currentFormData = ref<IPendantItem>(initCurrenFormData());
const resetCurrentFormData = () => {
  currentFormData.value = initCurrenFormData();
};
const handleCloseDialog = () => {
  resetCurrentFormData();
  dialogVisible.value = false;
  formRef.value?.resetFields();
  typeSelect.value = 1;
  showImageUrlInput.value = true;
  showDescription.value = false;
};

/**
 * @name 新增侧边栏
 */
const pendantDialogControl = () => {
  dialogTitle.value = "新增侧边栏子内容";
  currentFormData.value = currentFormData.value;
  currentSaveHandler.value = addItem;
  dialogVisible.value = true;
};

const addItem = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      pendant.value.list.push({ ...currentFormData.value });
      dialogVisible.value = false;
      await updatePendant();
      resetCurrentFormData();
      formRef.value?.resetFields();
    } else {
      console.log("请正确填写表单数据");
    }
  });
};

const onEditPendant = (row: IPendantItem) => {
  Object.assign(currentFormData.value, { ...row });
  currentPendantIndex.value = pendant.value.list.findIndex(
    (item: any) => item === row
  );
  copyPendantFunction();
};

/**
 * @name 修改侧边栏
 */
const confirmBase64 = (editPendant: any) => {
  if (editPendant.text && !editPendant.img) {
    typeSelect.value = 2;
    showImageUrlInput.value = false;
    showDescription.value = true;
  } else if (!editPendant.text && editPendant.img) {
    typeSelect.value = 1;
    showImageUrlInput.value = true;
    showDescription.value = false;
  } else if (editPendant.text && editPendant.img) {
    typeSelect.value = 3;
    showImageUrlInput.value = true;
    showDescription.value = true;
  }
};

//修改侧边栏
const currentPendantIndex = ref<number | null>(null);

const copyPendantFunction = () => {
  confirmBase64(currentFormData.value);
  dialogTitle.value = "编辑侧边栏";
  currentFormData.value = currentFormData.value;
  currentSaveHandler.value = savePendantItem;
  dialogVisible.value = true;
};

//保存侧边栏数据修改
const savePendantItem = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (currentPendantIndex.value !== null) {
        pendant.value.list[currentPendantIndex.value] = { ...currentFormData.value };
      }
      dialogVisible.value = false;
      await updatePendant();
      resetCurrentFormData();
      formRef.value?.resetFields();
    } else {
      console.log("请正确填写表单数据");
    }
  }
  );
};

/**
 * @name 删除侧边栏
 */

//删除侧边栏数据
const removeItem = async (row: any) => {
  const index = pendant.value.list.findIndex((item: any) => item === row);
  if (index !== -1) {
    pendant.value.list.splice(index, 1);
    await updatePendant();
  }
};

const saveSwitch = async (row: IPendantItem) => {
  if (!row.url) {
    return;
  }
  await updatePendant();
};

const handlePendentSwitch = async () => {
  if (!pendant.value.list.length) {
    return;
  }
  await updatePendant();
};

onMounted(async () => {
  isLoading.value = true;
  await reloadPendant();
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
