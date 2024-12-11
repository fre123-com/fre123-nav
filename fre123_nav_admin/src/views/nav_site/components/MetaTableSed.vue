<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :class="`flex-grow ${title}`"
    @selection-change="handleSelectionChange"
    ref="tableRef"
    v-loading="isLoading"  :row-key="rowKey"
  >
    <el-table-column
      v-if="showSelection || isBatchDelete"
      width="60"
      align="center"
      type="selection"
    >
    </el-table-column>
    <el-table-column
      v-else-if="isDraggable"
      width="60"
    >
    <el-icon class="dragIcon cursor-move">
        <Rank />
      </el-icon>
      <template #label> label </template>
    </el-table-column>

    <template v-for="propItem in propList" :key="propItem">
      <el-table-column
        align="left"
        v-bind="propItem"
        :show-overflow-tooltip="{ effect: 'light' }"
        :width="propItem?.columnWidth"
      >
        <template #default="scope">
          <slot :name="propItem.slotName" :row="scope.row">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>

    <el-table-column label="操作" fixed="right" :width="operateWidth">
      <template #default="scope">
        <div class="flex flex-row justify-end">

          <ElTooltip v-if="allowCopy" :enterable="false" content="分享" effect="light">
            <el-button circle :color="META_SUCCESS" @click="copy(scope?.row)">
              <template #icon>
                <el-icon color="#fff">
                  <share />
                </el-icon>
              </template>
            </el-button>
          </ElTooltip>

          <slot name="operateBtn" :row="scope.row"></slot>

          <ElTooltip :enterable="false" content="编辑" effect="light">
            <el-button circle :color="META_PRIMARY" @click="editData(scope?.row)">
              <template #icon>
                <el-icon color="#fff">
                  <edit />
                </el-icon>
              </template>
            </el-button>
          </ElTooltip>

          <el-popconfirm title="确定删除" @confirm="deleteData(scope?.row)">
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
        </div>
      </template>
      <template #header>
        <div class="flex justify-between" style="display: flex; align-items: center">
          <span style="flex-grow: 1">操作</span>
          <el-tooltip
            content="解锁批量操作"
            effect="light"
            v-if="showBatchDelete && !isBatchDelete"
          >
            <el-button
              type="primary"
              icon="lock"
              circle
              @click="unlockBatchDelete"
              class="operate-button"
            />
          </el-tooltip>
          <el-tooltip
            content="取消批量操作"
            effect="light"
            v-if="showBatchDelete && isBatchDelete && batchDeleteIds.length === 0"
          >
            <el-button
              type="primary"
              icon="unlock"
              circle
              @click="isBatchDelete = false"
              class="operate-button"
            />
          </el-tooltip>
          <el-popconfirm
            title="是否删除?"
            @confirm="handleBatchDelete"
            width="190px"
            v-if="showBatchDelete && batchDeleteIds.length > 0"
          >
            <template #reference>
              <el-button
                icon="delete"
                class="batch-delete-button"
                :color="META_DANGER"
                circle
                style="color: #fff"
              />
            </template>
          </el-popconfirm>
          <slot name="headerBtn"> </slot>
          <el-button :color="META_PRIMARY" circle @click="addData" style="align-items: flex-end">
            <template #icon>
              <el-icon color="#fff">
                <Plus />
              </el-icon>
            </template>
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script setup lang="ts">
import { META_DANGER, META_PRIMARY, META_SUCCESS } from '@/config/const'
import { get } from 'http';
import Sortable from 'sortablejs'
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    tableData: Array<any>
    propList: any
    showSelection?: boolean
    isLoading?: boolean
    operateWidth?: number
    showBatchDelete?: boolean
    operatedMargin?: object
    isDraggable?: boolean
    allowCopy?: boolean
    ref?: any
    rowKey?: string //用于排序作为标识
    title?:any
    groupIndex?:number
    tabIndex?:number
  }>(),
  {
    showSelection: () => {
      return false
    },
    isLoading: () => {
      return false
    },
    isDraggable: false,
    showBatchDelete: false,
    operateWidth: 100,
    allowCopy: false,
    rowKey: 'id'
  },
)
const batchDeleteIds = ref<string[]>([])
const isBatchDelete = ref(false)
const unlockBatchDelete = () => {
  isBatchDelete.value = true
}

const emit = defineEmits<{
  (e: 'selectionChange', value: any): void
  (e: 'addData', value: any): void
  (e: 'deleteData', value: any): void
  (e: 'editData', value: any): void
  (e: 'setTop', value: any): void
  (e: 'batchDelete', value: any): void
  (e: 'endDrag', newINdex: number, oldIndex: number): void
  (e: 'copy', value: any): void
  (e: 'selectionClear'): void
  (e: 'getIndex',groupIndex: any ,tabIndex: any,detailIndex: any): void  
}>()

const handleBatchDelete = () => {
  emit('batchDelete', batchDeleteIds.value)
}

const handleSelectionChange = (val: any) => {
  batchDeleteIds.value = []
  val.forEach((item: any) => {
    batchDeleteIds.value.push(item.id)
  })
  emit('selectionChange', val)
}
const tableRef = ref()

const handleSelectionClear = () => {
  tableRef.value!.clearSelection()
}

const addData = (row: any) => {
  getIndex(row)
  emit('addData',row)
}

const deleteData = (row: any) => {
  getIndex(row)
  emit('deleteData', row)
}

const editData = (row: any) => {
  getIndex(row)
  emit('editData', row)
}

const setTop = (row: any) => {
  emit('setTop', row)
}

const copy = (row: any) => {
  emit('copy', row)
}

const getIndex = (row: any) => {
  const rowIndex = props.tableData.indexOf(row);
  console.log('Mouse entered cell at row index:', rowIndex);
  emit('getIndex',props.groupIndex,props.tabIndex, rowIndex)
};
//拖拽
const rowDropInit = (className: string) => {
  // 转义以数字开头的类名
  const safeClassName = /^\d/.test(className) ? `\\${className}` : className;
  
  // 构造选择器
  const selector = `.${safeClassName} .el-table__body-wrapper tbody`;
  console.log(`Attempting to select: ${selector}`);
  
  // 查找元素
  const wrapperRow = document.querySelector(selector);
  
  if (wrapperRow) {
    Sortable.create(wrapperRow as HTMLElement, {
      animation: 150,
      handle: '.dragIcon',
      //@ts-ignore
      async onEnd({ newIndex, oldIndex }: { newIndex: number; oldIndex: number }) {
        console.log(newIndex, oldIndex);
        emit('endDrag', newIndex, oldIndex);
      },
    });
  } else {
    console.error(`Element not found for selector: ${selector}`);
  }
};

onMounted(() => {
  rowDropInit(props.title);
})
</script>
<style scoped>
.operate-button {
  margin-left: 12px;
}
.batch-delete-button {
  margin-left: 12px;
}
</style>
