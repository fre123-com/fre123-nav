<template>
  <div class="content-three">
    <MetaTable v-if="tableDataArray?.length" :tableData="tableDataArray" :propList="HeaderSectionPropList"
      @addData="addNewGroupDialog" @deleteData="deleteCategory" @editData="editGroup" :isDraggable="true" rowKey="id"
      :key="searchCategoryKey" :operateWidth="105" :is-loading="isLoading" @confirm-drag="saveSectionDrag">
      <el-table-column prop="name" />
      <el-table-column prop="key" />
      <template #is_show="{ row }">
        <el-switch v-model="row.is_show" @change="saveCategoryData(row)" :active-value="1"
          :inactive-value="0"></el-switch>
      </template>
    </MetaTable>
    <CommonDialog :dialog-visible="dialogVisible" :title="dialogTitle" :formData="currentFormData"
      :formRules="fieldRules" :saveHandler="currentSaveHandler" :fields="currentFormFields"
      @update:dialogVisible="(val: boolean) => (dialogVisible = val)" />
  </div>
</template>

<script setup lang="ts">
import {
  IHeaderSection,
  IHeaderTotal,
  IRequestBody,
  ITableDataArrayHeaderSection,
} from "@/api/modules/website/interface";
import CommonDialog from "@/components/Common/CommonDialog.vue";
import MetaTable from "@/components/MetaTable/index.vue";
import { websiteStore } from "@/store/modules/website";
import { errorMessage, successMessage } from "@/utils/notifications";
import {
  EditGroupFields,
  NewGroupFields,
} from "@/views/website/config/formConfig";
import { HeaderSectionPropList } from "@/views/website/config/tableConfig";
import {
  currentFormData,
  currentFormFields,
  currentSaveHandler,
  dialogTitle,
  dialogVisible,
  fieldRules,
  updateWebsite,
} from "@/views/website/index";
import { onMounted, reactive, Ref, ref, watch } from "vue";
import { TabType } from "../../interface";
const { websiteParams, refetchWebsite, websiteData } = websiteStore();

const isLoading = ref(false);

const reloadHeader = async () => {
  isLoading.value = true;
  websiteParams.value.type = TabType.Header;
  await refetchWebsite.value();
  setWebsiteDataToHeaderSection();
  isLoading.value = false;
};

const storedData = ref<IHeaderTotal>({
  search_engine: undefined,
  right: [],
});

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));
const setWebsiteDataToHeaderSection = async () => {
  const newVal = websiteData.value;
  if (newVal?.data) {
    await Object.assign(storedData.value, deepClone(newVal.data));
    setHeaderData(storedData.value.search_engine);
  }
};

const filteredHeader = reactive<{ [key: string]: IHeaderSection }>({});
const setHeaderData = (header: {
  [x: string]: any;
  hasOwnProperty: (arg0: string) => any;
}) => {
  Object.keys(filteredHeader).forEach((key) => delete filteredHeader[key]);
  for (const key in header) {
    if (header.hasOwnProperty(key)) {
      const item = header[key];
      filteredHeader[key] = item;
    }
  }
};

const requestBody = ref<IRequestBody>({
  type: TabType.Header,
  data: storedData,
});

const updateHeader = async () => {
  try {
    isLoading.value = true;
    await updateWebsite(requestBody.value);
    await reloadHeader();
    successMessage("数据成功保存");
    isLoading.value = false;
  } catch (error) {
    errorMessage("数据保存失败");
    reloadHeader();
  }
};

//当前选中的分类所对应的key
const activeTab = ref("");
const tableDataArray = ref<ITableDataArrayHeaderSection[]>([]);
let isActiveTabSet = false;

//通过计算得到的分类栏
const currentData: Ref<any> = ref([]);
const updateCurrentData = () => {
  currentData.value = filteredHeader[activeTab.value]?.list || [];
};

watch(
  filteredHeader,
  async (newFilteredHeader) => {
    const keys = Object.keys(newFilteredHeader);
    tableDataArray.value = keys.map((key) => ({
      key,
      ...newFilteredHeader[key],
    }));
    if (tableDataArray.value.length > 0 && !isActiveTabSet) {
      activeTab.value = tableDataArray.value[0].key;
      isActiveTabSet = true;
      updateCurrentData();
    } else if (tableDataArray.value.length === 0) {
      activeTab.value = "";
    }
  },
  { deep: true }
);

//搜索引擎管理和广告位配置————header数据配置
const newCategoryFieldName = ref("");
const newCategory = ref<IHeaderSection>({ name: "", is_show: 0, list: [] });

/**
 * @name 新增搜素引擎和搜素引擎分类
 */

//打开新增搜索引擎分类
const addNewGroupDialog = () => {
  dialogTitle.value = "新增搜索引擎分类";
  currentFormData.value = newCategoryForm.value;
  currentSaveHandler.value = addNewCategory;
  currentFormFields.value = NewGroupFields;
  dialogVisible.value = true;
};

// 使用计算属性来确保表单数据是响应式的
const newCategoryForm = ref({
  newCategoryFieldName: "",
  name: "",
  is_show: 0,
});

watch([newCategoryFieldName, newCategory], () => {
  newCategoryForm.value = {
    newCategoryFieldName: newCategoryFieldName.value,
    ...newCategory.value,
  };
});

//新增搜索引擎分类方法实现
const addNewCategory = async () => {
  const formData = newCategoryForm.value;
  const fieldName = formData.newCategoryFieldName.trim();
  filteredHeader[fieldName] = {
    name: formData.name,
    is_show: formData.is_show,
    list: [],
  };
  const storedHeader = storedData.value as IHeaderTotal;
  const rightSection = storedHeader.right;
  if (storedHeader) {
    const updatedHeader = {
      right: rightSection,
      search_engine: filteredHeader,
    };
    requestBody.value.data = updatedHeader || {};
    await updateHeader();
    dialogVisible.value = false;
    newCategoryFieldName.value = "";
    newCategory.value = { name: "", is_show: 0, list: [] };
  }
};

const editCategory = ref<{
  key: string;
  name: string;
  is_show: number;
  list: any[];
}>({ key: "", name: "", is_show: 0, list: [] });
const editGroup = (row: { key: string } & IHeaderSection) => {
  editCategory.value = { ...row };
  dialogTitle.value = "修改搜索引擎";
  currentFormData.value = editCategory.value;
  currentSaveHandler.value = confirmSaveCategoryData;
  currentFormFields.value = EditGroupFields;
  dialogVisible.value = true;
};

/**
 * @name 保存搜素引擎分类以及搜索引擎更改
 */

//确认保存分类数据修改
const confirmSaveCategoryData = () => {
  if (!editCategory.value.key) {
    return;
  }
  saveCategoryData(editCategory.value);
  dialogVisible.value = false;
};

//保存对搜索引擎分类修改的方法
const saveCategoryData = async (row: {
  key: string;
  name: string;
  is_show: number;
  list: any[];
}) => {
  if (!row.key) {
    return;
  }
  const { key, ...data } = row;
  filteredHeader[key] = data;
  const storedHeader = deepClone(storedData.value);
  const rightSection = storedHeader.right;
  const updatedHeader = {
    right: rightSection,
    search_engine: filteredHeader,
  };
  requestBody.value.data = updatedHeader;
  await updateHeader();
};

/**
 * @name 删除搜素引擎分类以及搜索引擎
 */

// 删除搜索引擎分类
const deleteCategory = async (row: any) => {
  const keyToDelete = row.key as string;
  const storedHeader = deepClone(storedData.value);
  const rightSection = storedHeader.right;
  if (storedHeader) {
    const header = storedHeader.search_engine;
    if ((header as Record<string, any>)[keyToDelete]) {
      delete (header as Record<string, any>)[keyToDelete];
      delete (filteredHeader as Record<string, any>)[keyToDelete];
      const updatedHeader = {
        right: rightSection,
        search_engine: header,
      };
      requestBody.value.data = updatedHeader;
      await updateHeader();
    } else {
      errorMessage("未找到要删除的分类数据");
    }
  }
};

const searchCategoryKey = ref(0);
const saveSectionDrag = async (list: any) => {
  tableDataArray.value = [...list];
  const existingHeader = deepClone(storedData.value);
  const rightSection = existingHeader.right;
  const updatedHeaderMap = new Map<string, any>([
    ["right", rightSection],
    [
      "search_engine",
      Object.fromEntries(
        tableDataArray.value.map((item) => [
          item.key,
          {
            name: item.name,
            is_show: item.is_show,
            list: item.list,
          },
        ])
      ),
    ],
  ]);
  requestBody.value.data = Object.fromEntries(updatedHeaderMap);
  const updatedData = Object.fromEntries(updatedHeaderMap);
  setHeaderData(updatedData.search_engine);
  storedData.value.search_engine = updatedData.search_engine;
  isLoading.value = true;
  await updateWebsite(requestBody.value);
  successMessage("数据成功保存");
  updateCurrentData();
  isLoading.value = false;
  searchCategoryKey.value++;
};

const refresh = async () => {
  isLoading.value = true;
  websiteParams.value.type = TabType.Header;
  await refetchWebsite.value();
  isLoading.value = false;
  successMessage("刷新成功");
};
defineExpose({ refresh });

onMounted(async () => {
  isLoading.value = true;
  await reloadHeader();
  updateCurrentData();
  isLoading.value = false;
});
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
