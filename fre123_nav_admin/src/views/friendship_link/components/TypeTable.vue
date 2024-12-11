<template>
  <!-- 头部 -->
  <div class="typeTable-top">
    <div class="data-show-number">
      <el-icon size="large" color="#409EFF" style="margin-right: 10px">
        <List /> </el-icon
      >类别数量：{{ props.tableList?.length }}
    </div>
    <div class="typeTable-top-refresh">
      <el-button
        circle
        size="large"
        type="info"
        plain
        :icon="Refresh"
        @click="friendshipLinkApi.refresh('刷新成功')"
      ></el-button>
    </div>
  </div>

  <!-- 类别表格板块 -->
  <!-- 使用 MetaTable 组件 -->
  <MetaTable
    @confirmDrag="updateNewSort"
    :isDraggable="true"
    :operateWidth="operateWidth"
    :key="metaTableKey"
    max-height="500"
    :is-loading="props.loading"
    :tableData="props.tableList ?? []"
    :propList="props.propList"
    @addData="dialogs[2].isVisible = true"
    @deleteData="deleteTypes"
    @editData="editGetKindOp"
    @setTop="upTop"
  >
    <template #count="{ row }">
      <text
        class="countColor"
        @click="typeToUrl(row.name)"
        :class="{ disabled: row.count === 0 }"
        >{{ row.count }}</text
      >
    </template>
    <template #created_at="{ row }">
      <text>{{ friendshipLinkApi.formatUnixTimestamp(row.created_at) }}</text>
    </template>
    <template #status="{ row }">
      <el-switch
        v-model="row.status"
        :loading="switchLoading"
        :active-value="1"
        :inactive-value="0"
        @click="switchChange(row)"
      ></el-switch>
    </template>
  </MetaTable>

  <!-- 使用 v-for 渲染多个 TypeDialog 组件 -->
  <TypeDialog
    v-for="dialog in dialogs"
    :key="dialog.id"
    :id="dialog.id"
    :rules="opRules"
    :title="dialog.title"
    :icon-type="dialog.iconType"
    :finishBtn="dialog.finishBtn"
    v-model="dialog.isVisible"
    :type-op="kindOp"
    :kind-finish-dialog="kindFinishDialog"
    :clean-dialog="cleanDialog"
  />
</template>

<script lang="ts" setup>
import TypeDialog from '@/views/friendship_link/components/TypeDialog.vue'
import {
  friendshipLinkApi,
  metaTableKey,
  tabName,
  tabActiveName,
  activeName,
  opForm,
  typeDataShow,
} from '@/views/friendship_link'
import { opRules, dialogs } from '@/views/friendship_link/config/friendshipTop'
import { MetaTable } from '../../../components'
import { Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'
import friendShipApi from '@/api/modules/friendship_link'
import { infoMessage, successMessage } from '@/utils/notifications'

const props = defineProps<{
  tableList: any[] // 使用数组类型注解，而不是 Array<any>
  loading: boolean
  propList: any[]
}>()

/**
 * @name 网址置顶
 */
const upTop = async (row: any) => {
  try {
    let upArr: any = []
    typeDataShow.value.forEach((e: { name: any }) => {
      upArr.push(e.name)
    })
    upArr = upArr.filter((obj: any) => obj !== row.name)
    upArr.unshift(row.name)
    await friendShipApi.sortTypeUser({
      sorted_names: upArr,
    })
    await friendshipLinkApi.getApiData()
    metaTableKey.value++
    successMessage('置顶成功')
    changeDragStatus()
  } catch (error) {
    // 可以选择将错误信息传递给用户或记录日志
    infoMessage('置顶出错,已撤销')
  }
}

let sortFinish: any = []

const operateWidth = ref(100)
//点击保存数据按钮，对数据进行保存操作
const updateNewSort = async (list: any) => {
  try {
    operateWidth.value = 100
    list.forEach((e: { name: any }) => {
      sortFinish.push(e.name)
    })
    await friendShipApi.sortTypeUser({
      sorted_names: sortFinish,
    })
    await friendshipLinkApi.refresh('保存成功')
  } catch (error) {
    infoMessage('拖拽出错,已撤销')
    return
  }
}

//重置拖拽数据
const initDragGroup = async (ifRefresh: boolean) => {
  operateWidth.value = 100
  if (ifRefresh === true) await friendshipLinkApi.getApiData()
  if (ifRefresh === true) infoMessage('已撤销')
  metaTableKey.value++
}

//修改拖拽锁定状态
const changeDragStatus = () => {
  sortFinish = []
  operateWidth.value = 140
}

// switch开关点击
const switchLoading = ref(false)
const switchChange = async (row: any) => {
  try {
    switchLoading.value = true
    await friendShipApi.updateUser({
      _id: row._id,
      name: row.name,
      status: row.status,
    })
    await friendshipLinkApi.getApiData()
    switchLoading.value = false
  } catch {
    console.log('status改变错误')
  }
}

//类别操作数组
const kindOp = ref<any>({
  _id: '',
  name: '',
  status: -1,
})

// 清空数据
const cleanDialog = () => {
  dialogs.value.forEach((e) => {
    e.isVisible = false
  })
  kindOp.value = {
    _id: '',
    name: '',
    status: -1,
  }
  opForm.value.resetFields() // 重置字段和验证状态
}

/**
 * @name 点击编辑获取该条类别数据
 */
const editGetKindOp = (row: any) => {
  dialogs.value.forEach((e) => {
    if (e.id === 'typeEdit') e.isVisible = true
  })
  kindOp.value = { ...row }
}

/**
 * @name 点击类别数量跳转到网址并且自动分类
 */
const typeToUrl = (name: string) => {
  activeName.value = 'web'
  tabName.value = name
  tabActiveName.value = name
  friendshipLinkApi.handleTabClickUse()
}

/**
 * @name 弹窗确认按钮
 */
const kindFinishDialog = async (id: string) => {
  try {
    await friendshipLinkApi.validateForm((valid) => {
      if (valid) {
        if (id === 'add') {
          insertTypes()
        } else {
          updateTypes()
        }
      } else {
        console.log('表单验证失败')
      }
    })
  } catch (error) {
    console.log(error, 111)
  }
}

// type添加操作
const insertTypes = async () => {
  try {
    console.log(kindOp.value.name, kindOp.value.status)

    const data = await friendShipApi.insertUser({
      name: kindOp.value.name,
      status: kindOp.value.status,
      list: [],
    })
    friendshipLinkApi.refresh('添加成功')
    cleanDialog()
  } catch (error: any) {
    infoMessage(error.err_msg)
  }
}
//type更新操作
const updateTypes = async () => {
  try {
    await friendShipApi.updateUser({
      _id: kindOp.value._id,
      name: kindOp.value.name,
      status: kindOp.value.status,
    })
    friendshipLinkApi.refresh('编辑成功')
    cleanDialog()
  } catch {
    console.log('数据更新错误')
  }
}
// type删除操作
const deleteTypes = async (row: any) => {
  try {
    await friendShipApi.delUser({
      ids: [row._id],
    })
    friendshipLinkApi.refresh('删除成功')
  } catch {
    console.log('数据删除错误')
  }
}
</script>

<style lang="css" scope>
.countColor {
  cursor: pointer;
  color: #409eff;
}

.disabled {
  pointer-events: none;
  /* 阻止点击事件 */
  color: #ccc;
  /* 可选：改变颜色以表示禁用状态 */
}
</style>
