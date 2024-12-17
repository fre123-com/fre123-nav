<template>
  <div>
    <div v-if="!tableData?.length">当前没有数据,请返回分类管理添加</div>
    <el-tabs
      type="card"
      v-loading="!tableData || loading"
      style="display: block; width: 100%"
      @tab-click="TabClick"
    >
      <el-tab-pane
        v-for="(group, groupIndex) in tableData"
        :label="group.group_name"
        :key="groupIndex"
      >
        <template #default>
          <el-tabs
            v-model:activeName="tabName"
            tab-position="left"
            class="demo-tabs"
            style="display: block; width: 100%"
            @tab-click="handleTabClick"
          >
            <div v-if="!group.tab_list || group.tab_list.length === 0">
              当前没有数据,请返回分类管理添加
            </div>
            <el-tab-pane
              v-for="(tab, tabIndex) in group.tab_list"
              :label="tab.tab_name"
              :key="tabIndex"
              :class="tab.tab_name"
            >
              <MetaTable
                v-if="tabName === tab.tab_name"
                :propList="tableConfig.propList ?? []"
                :tableData="tab.details"
                @addData="newDialog(groupIndex, tabIndex)"
                @edit-data="showDialog($event, groupIndex, tabIndex)"
                @delete-data="deleteRow($event, groupIndex, tabIndex)"
                :isDraggable="true"
                @confirm-drag="updateNewSort($event, groupIndex, tabIndex)"
                :key="metaTableKey"
              >
                <template #icon="scope">
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="scope.row.icon"
                    :fit="scope.row.fit"
                  />
                </template>
                <template #is_show="scope">
                  <el-switch
                    v-model="scope.row.is_show"
                    label="显示"
                    :active-value="1"
                    :inactive-value="0"
                    @click="change(groupIndex, tabIndex)"
                  />
                </template>
              </MetaTable>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 分割线---------下面是抽屉等等一系列东西------------------------------------------------------------------------ -->
    <SiteDialog
      :visible="currentRow.drawerVisible"
      :form-data="formData"
      :dialog-header="tShow"
      :edit-mode="bShow"
      @on-submit="onSubmit"
      @on-submit-new="newSubmit"
      @closed="currentRow.drawerVisible = false"
    >
    </SiteDialog>
  </div>
</template>
<script lang="ts" setup>
import { IRequestBody } from '@/api/modules/nav/interface'
import MetaTable from '@/components/MetaTable/index.vue'
import { navStore } from '@/store/modules/nav'
import { FormInstance } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'
import SiteDialog from './components/SiteDialog.vue'
import tableConfig, {
  openSuccessEdit,
  openSuccessNew,
  openWaring,
  TabItem,
  updateNav,
} from './index'

//更新数据的获取
// 当前激活的 group 和 tab 索引
const metaTableKey = ref(0)
const { refetchNav, navData } = navStore()
const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj))
const loading = ref(false)
const storedData = ref<TabItem>()
const _id = ref('')
const requestBody = ref<IRequestBody>({
  _id: _id.value,
  group_name: '',
  style: '',
  style_des: '',
  tab_list: storedData.value,
  group_name_url: '',
})
const tableData = ref('') as any
const bShow = ref(true)
const tShow = ref('')
const formData = ref({
  title: '',
  url: '',
  description: '',
  icon: '',
})
//

// const dIndex = ref(0)
// ------------------------上面是定义区---------------------------
const download = async () => {
  try {
    // 请求数据
    await refetchNav // 确保数据被请求
    let isDataLoaded = false // 数据加载标志
    // 循环直到数据有效
    while (!isDataLoaded) {
      await nextTick() // 等待下一次 DOM 更新
      // 检查数据格式
      if (navData.value?.data && typeof navData.value.data === 'object') {
        if (
          'rows' in navData.value.data &&
          Array.isArray(navData.value.data.rows)
        ) {
          loading.value = true
          tableData.value = deepClone(navData.value.data.rows)
          loading.value = false
          isDataLoaded = true // 数据已加载
        } else {
          tableData.value = []
          await new Promise((resolve) => setTimeout(resolve, 500)) // 延迟后重试
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500)) // 延迟后重试
      }
    }
  } catch (error) {}
}
const reloadHeader = async () => {
  await refetchNav.value()
}
const updateHeader = async () => {
  try {
    loading.value = true
    await updateData() // 更新数据
    await updateNav(requestBody.value) // 更新导航数据
    loading.value = false
    await reloadHeader() // 重新加载头部信息
  } catch (error) {
    await reloadHeader() // 在更新失败时重新加载头部信息
  }
}
//更新数据
const updateData = async () => {
  const { groupIndex } = editingIndex.value || {}
  if (groupIndex === undefined || !tableData.value[groupIndex]) {
    return
  }
  const groupData = tableData.value[groupIndex]
  requestBody.value = {
    ...requestBody.value, // 保留其他字段
    _id: groupData._id,
    group_name: groupData.group_name,
    style: groupData.style,
    style_des: groupData.style_des,
    group_name_url: groupData.group_name_url,
    tab_list: deepClone(groupData.tab_list), // 更新数据
  }
}
const getIndex = (row: any, groupIndex: number, tabIndex: number) => {
  const rowIndex =
    tableData.value[groupIndex].tab_list[tabIndex].details.indexOf(row)
  return rowIndex
}

// --------------------

const editingIndex = ref<{
  groupIndex: any
  tabIndex: any
  detailIndex: any
} | null>(null) //这是要修改的地方的索引
//定义数据用于input里面的修改
const currentRow = ref({ drawerVisible: false })
//获取对应的index
const tabName = ref('')
function handleTabClick(activeName: any) {
  tabName.value = activeName.props.label
  metaTableKey.value++ // Trigger re-render if necessary
}
function TabClick(activeName: any) {
  const index = activeName.index
  tabName.value = tableData.value[index].tab_list[0].tab_name
  metaTableKey.value++ // Trigger re-render if necessary
}
//获取数据
const newDialog = (groupIndex: number, tabIndex: number) => {
  resetData()
  tShow.value = '新建站点'
  bShow.value = false
  const detailIndex = 0
  editingIndex.value = { groupIndex, tabIndex, detailIndex }
  currentRow.value.drawerVisible = true
}
//

const updateNewSort = (details: any, groupIndex: number, tabIndex: number) => {
  tableData.value[groupIndex].tab_list[tabIndex].details = details
  editingIndex.value = { groupIndex, tabIndex, detailIndex: 0 }
  updateHeader()
  metaTableKey.value++
  //下面可以写对数据保存的一系列操作
}
//点击保存数据按钮，对数据进行保存操作

//新建的拉出抽屉
const newSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    const newItem = {
      title: formData.value.title,
      url: formData.value.url,
      icon: formData.value.icon,
      description: formData.value.description,
      suffix: true,
      is_show: true,
    }
    if (editingIndex.value) {
      const { groupIndex, tabIndex } = editingIndex.value
      tableData.value[groupIndex].tab_list[tabIndex].details.push(newItem)
    }
    currentRow.value.drawerVisible = false
    await updateHeader()
    openSuccessNew()
  } catch {
    openWaring()
  }
}
//新建的提交
const showDialog = (row: any, groupIndex: number, tabIndex: number) => {
  const detailIndex = getIndex(row, groupIndex, tabIndex)
  bShow.value = true
  tShow.value = '修改站点'
  editingIndex.value = { groupIndex, tabIndex, detailIndex }
  Object.assign(currentRow.value, { ...row, drawerVisible: true })
  Object.assign(formData.value, {
    title: row.title,
    url: row.url,
    description: row.description,
    icon: row.icon,
  })
}
//给数据赋值，保证替换，抽屉的拖拽
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid && editingIndex.value) {
      const { groupIndex, tabIndex, detailIndex } = editingIndex.value
      if (tableData.value) {
        const detail =
          tableData.value[groupIndex].tab_list[tabIndex].details[detailIndex]
        // 更新 detail 对象的属性
        detail.title = formData.value.title
        detail.url = formData.value.url
        detail.description = formData.value.description
        detail.icon = formData.value.icon
        await updateHeader()
        resetData()
        currentRow.value.drawerVisible = false // 关闭弹窗
        openSuccessEdit()
      }
    } else {
      openWaring()
    }
  })
}
const change = (groupIndex: number, tabIndex: number) => {
  editingIndex.value = { groupIndex, tabIndex, detailIndex: 0 }
  updateHeader()
}
//修改数据的提交
const resetData = () => {
  formData.value = {
    title: '',
    url: '',
    description: '',
    icon: '',
  }
}
//删除
const deleteRow = (row: any, groupIndex: number, tabIndex: number) => {
  const detailIndex = getIndex(row, groupIndex, tabIndex)
  editingIndex.value = { groupIndex, tabIndex, detailIndex }
  tableData.value[groupIndex].tab_list[tabIndex].details.splice(detailIndex, 1)
  updateHeader()
}
onMounted(async () => {
  await download() // 下载数据
  if (tableData.value.length > 0 && tableData.value[0].tab_list.length > 0) {
    tabName.value = tableData.value[0].tab_list[0].tab_name
  }
})
</script>

<style scoped>
body {
  margin: 0;
}

.form-top {
  margin-top: 20px;
}

.close-right {
  float: right;
  margin-right: 30px;
}

.top {
  position: relative;
  z-index: 10;
}

.demo-form-inline .el-form-item {
  margin-left: 15px;
}

.demo-form-inline .el-input {
  --el-input-width: 520px;
}

.demo-form-inline .el-select {
  --el-select-width: 520px;
}

.el-loading-mask {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
