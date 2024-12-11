<template>
  <div class="content-three">
    <div class="table-box-children">
      <el-tabs
        v-model="activeTab"
        tab-position="left"
        class="demo-tabs custom-tabs"
        :key="searchKey"
        @tab-click="tabChange()"
      >
        <el-tab-pane
          v-for="tab in tabBox"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
          class="custom-tab-pane"
        >
        </el-tab-pane>
      </el-tabs>

      <MetaTable
        v-if="activeTabName == 'search_engine'"
        :tableData="currentData ?? []"
        :propList="HeaderSearchPropList"
        @addData="addSectionChild"
        @deleteData="deleteRow"
        @editData="editChildRow"
        :isDraggable="true"
        :isSetTop="isSetTop"
        rowKey="id"
        :key="searchTableKey"
        :operateWidth="105"
        :is-loading="isLoading"
        @confirm-drag="saveChildDrag"
      >
        <el-table-column prop="name" />
        <template #url="{ row }">
          <a :href="row.url" target="_blank" class="custom-link">{{
            row.url
          }}</a>
        </template>
        <template #icon="{ row }">
          <img
            :src="row.icon"
            alt="icon"
            style="max-width: 50px; height: 50px"
          />
        </template>
        <el-table-column prop="placeholder" />
        <template #is_show="{ row }">
          <el-switch
            v-model="row.is_show"
            :active-value="1"
            :inactive-value="0"
            @change="saveSwitch(row)"
          ></el-switch>
        </template>
      </MetaTable>
    </div>
    <CommonDialog
      :dialog-visible="dialogVisible"
      :title="dialogTitle"
      :formData="currentFormData"
      :formRules="fieldRules"
      :saveHandler="currentSaveHandler"
      :fields="currentFormFields"
      @update:dialogVisible="(val: boolean) => (dialogVisible = val)"
    />
  </div>
</template>

<script setup lang="ts">
import {
  IHeaderSection,
  IHeaderTotal,
  IListItem,
  IRequestBody,
  ITableDataArrayHeaderSection,
} from '@/api/modules/website/interface'
import CommonDialog from '@/components/Common/CommonDialog.vue'
import MetaTable from '@/components/MetaTable/index.vue'
import { websiteStore } from '@/store/modules/website'
import {
  errorMessage,
  successMessage,
  warningMessage,
} from '@/utils/notifications'
import { SectionChildFields } from '@/views/website/config/formConfig'
import { HeaderSearchPropList } from '@/views/website/config/tableConfig'
import {
  currentFormData,
  currentFormFields,
  currentSaveHandler,
  dialogTitle,
  dialogVisible,
  fieldRules,
  updateWebsite,
} from '@/views/website/index'
import { nextTick, onMounted, reactive, Ref, ref, watch } from 'vue'
import { TabType } from '../../interface'
const { websiteParams, refetchWebsite, websiteData } = websiteStore()

const isLoading = ref(false)
const isSetTop = ref(false)

const activeTabName = ref('search_engine')

const reloadHeader = async () => {
  isLoading.value = true
  websiteParams.value.type = TabType.Header
  await refetchWebsite.value()
  setWebsiteDataToHeaderSection()
  isLoading.value = false
}

const saveSwitch = async (row: IListItem) => {
  if (!row.name) {
    return
  }
  const tabKey = activeTab.value
  const updatedList = [...filteredHeader[tabKey].list]
  await saveTabData(tabKey, updatedList)
}

const storedData = ref<IHeaderTotal>({
  search_engine: undefined,
  right: [],
})

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj))
const setWebsiteDataToHeaderSection = async () => {
  const newVal = websiteData.value
  if (newVal?.data) {
    await Object.assign(storedData.value, deepClone(newVal.data))
    setHeaderData(storedData.value.search_engine)
  }
}

const filteredHeader = reactive<{ [key: string]: IHeaderSection }>({})
const setHeaderData = (header: {
  [x: string]: any
  hasOwnProperty: (arg0: string) => any
}) => {
  Object.keys(filteredHeader).forEach((key) => delete filteredHeader[key])
  for (const key in header) {
    if (header.hasOwnProperty(key)) {
      const item = header[key]
      filteredHeader[key] = item
    }
  }
}

const requestBody = ref<IRequestBody>({
  type: TabType.Header,
  data: storedData,
})

const updateHeader = async () => {
  try {
    isLoading.value = true
    await updateWebsite(requestBody.value)
    await reloadHeader()
    updateCurrentData()
    successMessage('数据成功保存')
    isLoading.value = false
  } catch (error) {
    errorMessage('数据保存失败')
    reloadHeader()
  }
}

//当前选中的分类所对应的key
const activeTab = ref('')
const tableDataArray = ref<ITableDataArrayHeaderSection[]>([])
let isActiveTabSet = false

watch(
  filteredHeader,
  async (newFilteredHeader) => {
    const keys = Object.keys(newFilteredHeader)
    tableDataArray.value = keys.map((key) => ({
      key,
      ...newFilteredHeader[key],
    }))
    if (tableDataArray.value.length > 0 && !isActiveTabSet) {
      activeTab.value = tableDataArray.value[0].key
      isActiveTabSet = true
      await updateTabBox()
      updateCurrentData()
    } else if (tableDataArray.value.length === 0) {
      activeTab.value = ''
    }
  },
  { deep: true }
)

const previousActiveTab = ref<string | null>(null)
const tabChange = () => {
  if (activeTab.value !== '') {
    previousActiveTab.value = activeTab.value
    nextTick(() => {
      updateCurrentData() // DOM 更新后再更新 currentData
      initTabChangeDragGroup()
    })
  }
}

//通过计算得到的分类栏
const tabBox: Ref<{ name: string; label: string }[]> = ref([])
const currentData: Ref<any> = ref([])
const updateTabBox = async () => {
  tabBox.value = []
  const keys = Object.keys(filteredHeader)
  tabBox.value = keys.map((key) => ({
    name: key,
    label: filteredHeader[key].name,
  }))
}
//选中分类后展示的搜索引擎数据
const updateCurrentData = () => {
  currentData.value = filteredHeader[activeTab.value]?.list || []
}

/**
 * @name 搜索引擎拖拽方法逻辑实现
 */
const searchKey = ref(0)
const searchTableKey = ref(0)
const searchTableSlotKey = ref(0)

/**
 * @name 搜索引擎拖拽方法逻辑实现
 */
// 保存数据更改
const saveChildDrag = async (list: any) => {
  updateCurrentData()
  const tabKey = activeTab.value
  const updatedListWithIndex = list.map((item: any, index: any) => ({
    ...item,
    index,
  }))
  const storedHeader = deepClone(storedData.value)
  const rightSection = storedHeader.right
  if (storedHeader) {
    const header = storedHeader.search_engine
    header[tabKey] = {
      ...header[tabKey],
      list: updatedListWithIndex,
    }
    const updatedHeader = {
      right: rightSection,
      search_engine: header,
    }
    requestBody.value.data = updatedHeader
    await updateHeader()
    updateCurrentData()
    searchTableKey.value++
  }
}

//切换选中分类关闭拖拽开关
const initTabChangeDragGroup = async () => {
  searchTableKey.value++
  searchTableSlotKey.value++
}

/**
 * @name 搜素引擎
 */

const newList = ref<IListItem>({
  name: '',
  url: '',
  icon: '',
  is_show: 1,
  placeholder: '',
})

//打开新增搜索引擎的弹窗
const addSectionChild = () => {
  if (!tabBox.value?.length) {
    warningMessage('请先在搜索引擎分类中添加数据')
    return
  }
  dialogTitle.value = '新增搜索引擎'
  currentFormData.value = newList.value
  currentSaveHandler.value = addNewList
  currentFormFields.value = SectionChildFields
  dialogVisible.value = true
}

//新增搜索引擎方法实现
const addNewList = () => {
  const updatedList = [
    ...filteredHeader[activeTab.value].list,
    { ...newList.value },
  ]
  saveTabData(activeTab.value, updatedList)
  newList.value = {
    name: '',
    url: '',
    icon: '',
    is_show: 0,
    placeholder: '',
  }
  dialogVisible.value = false
}

const editChild = ref<IListItem>({
  name: '',
  url: '',
  icon: '',
  is_show: 0,
  placeholder: '',
})

// 编辑搜索引擎
const editChildRow = (row: any) => {
  console.log('Editing row:', row)
  editChild.value = deepClone(row)
  editChildDialog()
}

const currentName = ref('')
const editChildDialog = () => {
  dialogTitle.value = '修改搜索引擎'
  currentName.value = editChild.value?.name
  currentFormData.value = editChild.value
  currentSaveHandler.value = confirmSaveChildData
  currentFormFields.value = SectionChildFields
  dialogVisible.value = true
}

/**
 * @name 保存搜索引擎更改
 */

const findIndexByName = (list: any[], name: string): number => {
  return list.findIndex((item) => item.name === name)
}

const confirmSaveChildData = async () => {
  const tabKey = activeTab.value
  const updatedList = [...filteredHeader[tabKey].list]
  const nameIndex = currentName.value
  const index = findIndexByName(updatedList, nameIndex)
  if (index !== -1) {
    updatedList[index] = deepClone(editChild.value)
  } else {
    updatedList.push(deepClone(editChild.value))
  }
  saveTabData(tabKey, updatedList)
  dialogVisible.value = false
}

//保存对搜索引擎的修改
const saveTabData = async (tabKey: string, updatedList: any[]) => {
  if (filteredHeader[tabKey]) {
    filteredHeader[tabKey].list = updatedList.map((item: any, index: any) => ({
      ...item,
      index,
    }))
    const storedHeader = deepClone(storedData.value)
    const rightSection = storedHeader.right
    const updatedHeader = {
      right: rightSection,
      search_engine: filteredHeader,
    }
    requestBody.value.data = updatedHeader
    await updateHeader()
  }
}

/**
 * @name 删除搜索引擎
 */

//删除搜索引擎的子内容
const deleteRow = (row: any) => {
  const tabKey = activeTab.value
  const currentTabData = filteredHeader[tabKey]?.list
  if (currentTabData) {
    const index = currentTabData.indexOf(row)
    if (index > -1) {
      currentTabData.splice(index, 1)
      saveTabData(tabKey, currentTabData)
    }
  }
}

const refresh = async () => {
  isLoading.value = true
  websiteParams.value.type = TabType.Header
  await refetchWebsite.value()
  isLoading.value = false
  successMessage('刷新成功')
}
defineExpose({ refresh })

onMounted(async () => {
  isLoading.value = true
  websiteParams.value.type = ''
  await refetchWebsite.value()
  await reloadHeader()
  updateTabBox()
  updateCurrentData()
  searchKey.value++
  isLoading.value = false
})
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
