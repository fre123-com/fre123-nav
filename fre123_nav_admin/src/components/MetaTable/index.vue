<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    class="flex-grow dragTable"
    @selection-change="handleSelectionChange"
    ref="tableRef"
    v-loading="isLoading"
    :row-key="rowKey"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column
      v-if="showSelection || isBatchDelete"
      width="60"
      align="center"
      type="selection"
    >
    </el-table-column>

    <el-table-column v-if="isDraggable" width="48">
      <template #header>
        <el-tooltip
          v-if="isLock"
          content="解锁拖拽功能"
          effect="light"
          class="w-6 h-6"
        >
          <el-button
            link
            size="small"
            @click="handleLock(false)"
            icon="lock"
            circle
          />
        </el-tooltip>
        <el-button
          v-else
          size="small"
          circle
          type="primary"
          @click="handleLock(true)"
          icon="Check"
        >
        </el-button>
      </template>
      <template #default="{ row }">
        <el-icon v-if="!isLock" class="dragIcon cursor-move">
          <Rank />
        </el-icon>
      </template>
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
          <el-popconfirm
            v-if="isDraggable && isSetTop"
            title="确定置顶"
            @confirm="setTop(scope?.row)"
          >
            <template #reference>
              <el-button
                :style="operatedMargin"
                circle
                :color="META_INDIVIDUATION"
              >
                <template #icon>
                  <el-icon color="#fff">
                    <top />
                  </el-icon>
                </template>
              </el-button>
            </template>
          </el-popconfirm>

          <slot name="operateBtn" :row="scope.row"></slot>

          <ElTooltip :enterable="false" content="编辑" effect="light">
            <el-button
              circle
              :color="META_PRIMARY"
              @click="editData(scope?.row)"
            >
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
        <div
          class="flex justify-between"
          style="display: flex; align-items: center"
        >
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
            v-if="
              showBatchDelete && isBatchDelete && batchDeleteIds.length === 0
            "
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
            v-if="showBatchDelete && batchDeleteIds.length > 0 && isBatchDelete"
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
          <el-button
            :color="META_PRIMARY"
            circle
            @click="addData"
            style="align-items: flex-end"
          >
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
</template>
<script setup lang="ts">
import { META_DANGER, META_INDIVIDUATION, META_PRIMARY } from "@/config/const";
import Sortable from "sortablejs";
import { onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    tableData: any[];
    propList: any;
    showSelection?: boolean;
    isLoading?: boolean;
    operateWidth?: number;
    showBatchDelete?: boolean;
    operatedMargin?: object;
    isDraggable?: boolean;
    isSetTop?: boolean;
    ref?: any;
    rowKey?: string; //用于排序作为标识
  }>(),
  {
    showSelection: false,
    isLoading: false,
    isDraggable: false, // 是否支持拖拽
    isSetTop: false, // 是否支持置顶
    showBatchDelete: false, // 是否展示批量删除
    operateWidth: 100,
    rowKey: "id",
  }
);

console.log("props is ", props);

const batchDeleteIds = ref<string[]>([]);
const isBatchDelete = ref(false);
const unlockBatchDelete = () => {
  isBatchDelete.value = true;
};

// 事件定义，调用方只需要实现对应的事件即可
const emit = defineEmits<{
  (e: "selectionChange", value: any): void; // 选择项改变
  (e: "addData"): void; // 新增
  (e: "deleteData", value: any): void; // 删除
  (e: "editData", value: any): void; // 编辑
  (e: "setTop", value: any): void; // 置顶
  (e: "batchDelete", value: any): void; // 批量删除
  (e: "confirmDrag", tempList: any): void; //  拖拽结束
  (e: "cancelDrag"): void; //  拖拽结束
  // (e: "endDrag", newINdex: number, oldIndex: number): void; //  拖拽结束
  (e: "selectionClear"): void; //清除筛选项
}>();

// 批量删除
const handleBatchDelete = () => {
  emit("batchDelete", batchDeleteIds.value);
};

// 批量操作
const handleSelectionChange = (val: any) => {
  batchDeleteIds.value = [];
  val.forEach((item: any) => {
    batchDeleteIds.value.push(item.id);
  });
  emit("selectionChange", val);
};
const tableRef = ref();
const handleSelectionClear = () => {
  tableRef.value!.clearSelection();
};

const addData = () => {
  emit("addData");
};

const deleteData = (id: any) => {
  console.log("id is ", id);
  emit("deleteData", id);
};

const editData = (row: any) => {
  emit("editData", row);
};

const isLock = ref(true);
let tempList: any[] = [];
const sort = async (newIndex: number, oldIndex: number) => {
  if (newIndex === oldIndex) return;
  const currRow = tempList.splice(oldIndex, 1)[0];
  tempList.splice(newIndex, 0, currRow);
  console.log("data is", tempList);
};
const handleLock = async (lockStatus: boolean) => {
  if (lockStatus) {
    emit("confirmDrag", tempList);
  }
  isLock.value = lockStatus;
};

// 置顶
const setTop = (row: any) => {
  emit("setTop", row);
};

//拖拽
const rowDropInit = (className: string) => {
  const wrapperRow = document.querySelector(
    className + " .el-table__body-wrapper tbody"
  );
  console.log("wrapperRow", wrapperRow);

  Sortable.create(wrapperRow as HTMLElement, {
    animation: 150,
    handle: ".dragIcon",
    //@ts-ignore
    async onEnd({
      newIndex,
      oldIndex,
    }: {
      newIndex: number;
      oldIndex: number;
    }) {
      console.log(newIndex, oldIndex);
      // emit("endDrag", newIndex, oldIndex);
      sort(newIndex, oldIndex);
    },
  });
};

defineExpose({
  handleSelectionClear,
});

onMounted(() => {
  // 初始化拖拽事件
  const a = JSON.parse(JSON.stringify(props));
  console.log("props.tableData", a);
  if (props.isDraggable) {
    tempList = JSON.parse(JSON.stringify(props.tableData));
    rowDropInit(".dragTable");
  }
});
</script>
<style scoped>
.operate-button {
  margin-left: 12px;
}
.batch-delete-button {
  margin-left: 12px;
}
</style>
