<template>
  <div class="content-three">
    <MetaTable
      :tableData="advertGroup ?? []"
      :propList="HeaderAdvertPropList"
      @addData="openAddAdvertDialog"
      @deleteData="deleteAdvert"
      @editData="openEditDialog"
      :isDraggable="true"
      :isSetTop="isSetTop"
      rowKey="id"
      :key="advertGroupKey"
      :operateWidth="105"
      :is-loading="isLoading"
      @confirm-drag="updateAdvertDrag"
    >
      <el-table-column prop="name" />
      <template #url="{ row }">
        <el-tooltip :content="row.url" placement="top">
          <el-link :href="row.url" target="_blank">
            <span class="ellipsis-text">{{ row.url }}</span>
          </el-link>
        </el-tooltip>
      </template>
      <template #is_show="{ row }">
        <el-switch
          v-model="row.is_show"
          @change="saveAdvertGroupSwitchChange(row)"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </template>
    </MetaTable>
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
  IHeaderGroup,
  IHeaderTotal,
  IRequestBody,
} from '@/api/modules/website/interface'
import CommonDialog from '@/components/Common/CommonDialog.vue'
import MetaTable from '@/components/MetaTable/index.vue'
import { websiteStore } from '@/store/modules/website'
import { errorMessage, successMessage } from '@/utils/notifications'
import {
  AdvertAddGroupFields,
  AdvertEditGroupFields,
} from '@/views/website/config/formConfig'
import { HeaderAdvertPropList } from '@/views/website/config/tableConfig'
import {
  currentFormData,
  currentFormFields,
  currentSaveHandler,
  dialogTitle,
  dialogVisible,
  fieldRules,
  updateWebsite,
} from '@/views/website/index'
import { computed, onMounted, ref, watch } from 'vue'
import { TabType } from '../../interface'

const { websiteParams, refetchWebsite, websiteData } = websiteStore()

const isLoading = ref(false)
const isSetTop = ref(false)

const reloadHeader = async () => {
  isLoading.value = true
  websiteParams.value.type = TabType.Header
  await refetchWebsite.value()
  setWebsiteDataToHeaderAdvert()
  isLoading.value = false
}

const storedData = ref<IHeaderTotal>({
  search_engine: undefined,
  right: [],
})

const setWebsiteDataToHeaderAdvert = () => {
  const newVal = websiteData.value
  if (newVal?.data) {
    Object.assign(storedData.value, deepClone(newVal.data))
    setHeaderData(storedData.value)
  }
}

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj))
const setHeaderData = (header: IHeaderTotal) => {
  const rightItems = Array.isArray(header.right) ? header.right : []
  advertData.value.splice(
    0,
    advertData.value.length,
    ...rightItems.map((item) => ({
      is_show: item.is_show || 0,
      group: {
        name: item.group.name || '',
        url: item.group.url || '',
        children: item.group.children || [],
      },
    }))
  )
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
    successMessage('数据成功保存')
    isLoading.value = false
  } catch (error) {
    errorMessage('数据成功失败')
    reloadHeader()
  }
}

const activeAvertTab = ref('')
const previousActiveTab = ref<string | null>(null)

watch(activeAvertTab, (newTab) => {
  if (newTab !== '') {
    previousActiveTab.value = activeAvertTab.value
  }
})

const advertData = ref<IHeaderGroup[]>([])
const advertBox = computed(() => {
  return advertData.value.map((item) => {
    return {
      name: item.group.name,
      label: item.group.name,
    }
  })
})

const advertGroup = computed(() => {
  return advertData.value.map((item) => {
    return {
      is_show: item.is_show,
      name: item.group.name,
      url: item.group.url,
    }
  })
})

/**
 * @name 链接组拖拽方法逻辑实现
 */
const advertKey = ref(0)
const advertGroupKey = ref(0)

// 确认保存拖拽修改
const updateAdvertDrag = async (list: any) => {
  const storedHeader = deepClone(storedData.value)
  if (!storedHeader) return
  const updatedHeader = storedHeader as IHeaderTotal
  let advertGroups = updatedHeader.right
  const urlOrder = new Map<string, number>()
  list.forEach((item: { url: string; name: string }, index: number) => {
    urlOrder.set(item.name + item.url, index)
  })

  advertGroups.sort((a, b) => {
    const indexA = urlOrder.get(a.group.name + a.group.url) ?? -1
    const indexB = urlOrder.get(b.group.name + b.group.url) ?? -1
    return indexA - indexB
  })

  advertGroups.forEach((group) => {
    const groupUrl = group.group.url
    const childrenOrder = list
      .filter((item: { url: string }) => item.url === groupUrl)
      .map((item: { url: any }) => item.url)
    group.group.children.sort((a, b) => {
      const indexA = childrenOrder.indexOf(a.url)
      const indexB = childrenOrder.indexOf(b.url)
      return indexA - indexB
    })
  })
  requestBody.value.data = updatedHeader
  isLoading.value = true
  await updateWebsite(requestBody.value)
  storedData.value = deepClone(storedHeader)
  advertKey.value++
  advertGroupKey.value++
  setHeaderData(storedData.value)
  successMessage('数据成功保存')
  //updateHeader()
  isLoading.value = false
}

/**
 * @name 新增链接组
 */

const newAdvert = ref<IHeaderGroup>({
  is_show: 1,
  group: { name: '', url: '', children: [] },
})

const openAddAdvertDialog = () => {
  if (advertData.value.length >= 3) {
    errorMessage('最多只能有3个广告分组')
    return
  }
  dialogTitle.value = '新增广告分组'
  currentFormData.value = newAdvert.value.group
  currentSaveHandler.value = addNewAdvert
  currentFormFields.value = AdvertAddGroupFields
  dialogVisible.value = true
}

const addNewAdvert = () => {
  advertData.value.push(deepClone(newAdvert.value))
  updateHeaderAdvert()
  dialogVisible.value = false
  newAdvert.value = {
    is_show: 1,
    group: { name: '', url: '', children: [] },
  }
}

/**
 * @name 新增链接
 */

const saveAdvertGroupSwitchChange = (row: any) => {
  if (!row.name) {
    return
  }
  const originalItem = advertData.value.find(
    (item) => item.group.name === row.name && item.group.url === row.url
  )
  if (originalItem) {
    originalItem.is_show = row.is_show
    updateHeaderAdvert()
  }
}

/**
 * @name 保存修改方法实现
 */

const updateHeaderAdvert = async () => {
  const storedHeader = deepClone(storedData.value)
  if (storedHeader) {
    const updatedHeader = storedHeader as IHeaderTotal
    updatedHeader.right = advertData.value.map((item) => ({
      is_show: item.is_show,
      group: {
        name: item.group.name,
        url: item.group.url,
        children: item.group.children,
      },
    }))
    requestBody.value.data = updatedHeader || {}
    await updateHeader()
  } else {
    console.error('本地存储中没有header数据')
  }
}

/**
 * @name 编辑链接组
 */

const editAdvert = ref<IHeaderGroup>({
  is_show: 1,
  group: { name: '', url: '', children: [] },
})

const openEditDialog = (row: any) => {
  const index = advertData.value.findIndex((item) => item.group.url === row.url)
  if (index !== -1) {
    const foundItem = advertData.value[index]
    editAdvert.value = {
      is_show: foundItem.is_show,
      group: {
        name: foundItem.group.name,
        url: foundItem.group.url,
        children: [...foundItem.group.children],
      },
    }
    copyAdvertGroup()
  } else {
    console.error('未找到广告分组:', row.url)
  }
}

const copyAdvertGroup = () => {
  dialogTitle.value = '编辑广告分组'
  currentFormData.value = editAdvert.value.group
  currentSaveHandler.value = saveAdvert
  currentFormFields.value = AdvertEditGroupFields
  dialogVisible.value = true
}

const saveAdvert = () => {
  const advert = editAdvert.value
  const index = advertData.value.findIndex(
    (item) => item.group.url === advert.group.url
  )
  if (index !== -1) {
    advertData.value[index] = {
      ...advertData.value[index],
      is_show: advert.is_show,
      group: {
        ...advertData.value[index].group,
        name: advert.group.name,
        children: advert.group.children,
      },
    }
    updateHeaderAdvert()
    dialogVisible.value = false
  } else {
    errorMessage('未找到广告分组')
  }
}

/**
 * @name 删除
 */

const deleteAdvert = (row: any) => {
  const index = advertData.value.findIndex(
    (item: any) => item.group.name === row.name && item.group.url === row.url
  )
  if (index !== -1) {
    advertData.value.splice(index, 1)
    updateHeaderAdvert()
  } else {
    errorMessage('未找到广告分组')
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
  await reloadHeader()
  if (advertBox.value.length > 0) {
    activeAvertTab.value = advertBox.value[0].name
  }
  isLoading.value = false
})
</script>
