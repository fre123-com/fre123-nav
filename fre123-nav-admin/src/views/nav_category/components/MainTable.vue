<template>
   <el-table
      v-loading="!tableData || loading"
      :data="tableData"
      style="width: 100%"
      :row-key="(row: any) => row._id"
      :expand-row-keys="expandedRowKeys"
      @expand-change="expandOpen"
      :row-class-name="getRowClass"
    >
      <el-table-column  type="expand" >
        <template #default="props">
          <div>
            <el-table
              :data="props.row.tab_list"
              :show-header="false"
              class="table-left"

              style="width: 90%"
            >
              <el-table-column label="类别" prop="tab_name" />
              <el-table-column label="跳转链接" prop="tab_name_url">
                <template v-slot="{ row }">
                  <span v-if="row.tab_name_url">{{ row.tab_name_url }}</span>
                  <span v-else>暂无数据</span>
                </template>
              </el-table-column>

              <el-table-column align="right">
                <template #default="scope">
                  <ElTooltip :enterable="false" content="编辑" effect="light">
                    <el-button
                      circle
                      :color="META_PRIMARY"
                      style="margin-left: -10px"
                      @click="
                        showDialogSed(props.$index, scope.$index, scope.row)
                      "
                    >
                      <template #icon>
                        <el-icon color="#fff">
                          <edit />
                        </el-icon>
                      </template>
                    </el-button>
                  </ElTooltip>

                  <el-popconfirm
                    :title="`这下面有 ${
                      tableData[props.$index].tab_list[scope.$index].details
                        .length
                    } 个子内容，确定要删除吗？`"
                    @confirm="deleteRowSed(props.$index, scope.$index, scope.row)"
                  >
                    <template #reference>
                      <el-button :color="META_DANGER" circle>
                        <template #icon>
                          <el-icon color="#fff">
                            <delete />
                          </el-icon>
                        </template>
                      </el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="group_name" />
      <el-table-column label="风格样式" prop="style_des" />
      <el-table-column label="跳转链接" prop="group_name_url">
        <template v-slot="{ row }">
          <span v-if="row.group_name_url">{{ row.group_name_url }}</span>
          <span v-else>暂无数据</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template #header>
          <span>操作</span>
          <el-button
            circle
            :color="META_PRIMARY"
            style="margin-left: 200px"
            @click="newDialog"
          >
            <template #icon>
              <el-icon color="#fff">
                <plus />
              </el-icon>
            </template>
          </el-button>
        </template>

        <template #default="scope" class="left">
          <ElTooltip :enterable="false" content="编辑" effect="light">
            <el-button
              circle
              :color="META_PRIMARY"
              style="margin-left: -10px"
              @click="showDialog(scope.$index, scope.row)"
            >
              <template #icon>
                <el-icon color="#fff">
                  <edit />
                </el-icon>
              </template>
            </el-button>
          </ElTooltip>

          <ElTooltip :enterable="false" content="查看" effect="light">
            <el-button
              circle
              :color="META_SUCCESS"
              style="margin-left: 10px"
              @click="dialogPreview(scope.$index, scope.row)"
            >
              <template #icon>
                <el-icon color="#fff">
                  <View />
                </el-icon>
              </template>
            </el-button>
          </ElTooltip>

          <el-button
            circle
            :color="META_SUCCESS"
            style=""
            @click="newDialogSed(scope.$index)"
          >
            <template #icon>
              <el-icon color="#fff">
                <plus />
              </el-icon>
            </template>
          </el-button>

          <el-popconfirm
            @confirm="deleteRow(scope.$index, scope.row)"
            :title="`这下面有 ${
              tableData[scope.$index].tab_list.length
            } 个子内容，确定要删除吗？`"
          >
            <template #reference>
              <el-button :color="META_DANGER" circle>
                <template #icon>
                  <el-icon color="#fff">
                    <delete />
                  </el-icon>
                </template>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </template>
<script lang="ts" setup>
import { META_DANGER, META_PRIMARY, META_SUCCESS } from '@/config/const'
import { computed, ref } from 'vue';
const expandedRowKeys = ref<string[]>([])
const props = withDefaults(
 defineProps<{
 tableData: any;
 loading: boolean;
 }>(),
 {
 },
)
const emit = defineEmits<{
 (e: 'showDialog',groupIndex: any, row: any): void
 (e: 'showDialogSed', groupIndex: any, tabIndex: number, row: any): void
 (e: 'deleteRowSed', groupIndex: any, tabIndex: number, row: any): void
 (e: 'newDialog'): void
 (e: 'newDialogSed', value: any): void
 (e: 'dialogPreview', groupIndex: any, row: any): void
 (e: 'deleteRow', groupIndex: any, row: any): void
}>()

const showDialog = (groupIndex: number, row: any) => {
  emit('showDialog', groupIndex, row)
}
const showDialogSed= (groupIndex: number, tabIndex: number, row: any) => {
  emit('showDialogSed', groupIndex, tabIndex, row)
}
const deleteRowSed = async (groupIndex: number, tabIndex: number, row: any) => {
  emit('deleteRowSed', groupIndex, tabIndex, row)
}
const newDialog = () => {
  emit('newDialog')
}
const newDialogSed = (groupIndex: number) => {
  emit('newDialogSed', groupIndex)
}
const dialogPreview = (groupIndex: number, row: any) => {
  emit('dialogPreview', groupIndex, row)
}
const deleteRow = async (groupIndex: number, row: any) => {
  emit('deleteRow', groupIndex, row)
}
//展开行固定的函数
const remove = (array: string[], item: string): boolean => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1); // 从数组中移除指定的项
    return true;
  }
  return false;
};
const expandOpen = async (row: any, expand: boolean) => {
  // 如果行已经存在于 expandedRowKeys 中，则移除它
  if (remove(expandedRowKeys.value, row._id)) {
    // 行被移除，说明我们要收起它
  } else {
    // 行不存在于 expandedRowKeys 中，说明我们要展开它
    expandedRowKeys.value.push(row._id)
  }
}
// @ts-ignore
const getRowClass = (row)=> {
      let data = row.row;
      let res = []as any;
      if (data.tab_list && data.tab_list.length > 0) {
        res.push('row-expand-has')
        return res;
      } else {
        res.push('row-expand-unhas')
        return res;
      }
    }

</script>
<style>
a.navbar {
  text-decoration: none; /* 去掉链接的下划线 */
  color: inherit; /* 继承父元素的文字颜色 */
}
.table-left {
  margin-left: 5%;
}
.form-top {
  margin-top: 20px;
}
.top {
  position: relative;
  z-index: 10;
}
.btn-group {
  display: flex;
  justify-content: flex-end; /* 右对齐 */
}
.close-right {
  float: right;
  margin-right: 30px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
}
.flex-item {
  flex: 0 0 calc(20% - 10px); /* 每行显示5列，并设置间隙 */
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
  align-items: center;
  border: 1px solid #ccc; /* 边框样式 */
  border-radius: 10px;
  padding: 5px; /* 内边距，可根据需求调整 */
  box-shadow: 0px 3px 3px rgb(227, 227, 227);
}
.border-change:hover {
  border: 1px solid rgb(239, 187, 145); /* 边框样式 */
}
.center {
  display: flex;
  align-items: center; /* 这将垂直居中子元素 */
}
.size {
  font-size: large;
  font-weight: 600;
}
/* 块的调整 */
.rounded-image {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
  align-items: center;
  border-radius: 0.75rem;
  border-width: 1px;
  padding: 8px;
}
.grid-item {
  padding: 10px; /* 可选，定义每个项目的内边距 */
}
.dragIcon {
  cursor: move; /* 拖拽手柄的样式 */
}
.el-loading-mask {
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-expand-arrow .el-table__expand-icon {
  display: none; /* Hide the expand icon */
}

.row-expand-unhas .el-table__expand-column{
  pointer-events: none;
}
.row-expand-unhas .el-table__expand-column .el-icon{
  visibility:hidden;
}
</style>