<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    class="flex-grow dragTable"
    @selection-change="handleSelectionChange"
    ref="tableRef"
    v-loading="isLoading"
    :row-key="rowKey"
  >
    <el-table-column
      v-if="showSelection || isBatchDelete"
      width="60"
      align="center"
      type="selection"
    >
    </el-table-column>
    <el-table-column v-else-if="isDraggable" width="60">
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
          <ElTooltip
            v-if="allowCopy"
            :enterable="false"
            content="分享"
            effect="light"
          >
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
import {
  META_DANGER,
  META_INDIVIDUATION,
  META_PRIMARY,
  META_SUCCESS,
} from "@/config/const";
import Sortable from "sortablejs";
import { onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    tableData: Array<any>;
    propList: any;
    showSelection?: boolean;
    isLoading?: boolean;
    operateWidth?: number;
    showBatchDelete?: boolean;
    operatedMargin?: object;
    isDraggable?: boolean;
    isSetTop?: boolean;
    allowCopy?: boolean;
    ref?: any;
    rowKey?: string; //用于排序作为标识
  }>(),
  {
    showSelection: () => {
      return false;
    },
    isLoading: () => {
      return false;
    },
    isDraggable: false,
    isSetTop: false,
    showBatchDelete: false,
    operateWidth: 100,
    allowCopy: false,
    rowKey: "id",
  }
);
const batchDeleteIds = ref<string[]>([]);
const isBatchDelete = ref(false);
const unlockBatchDelete = () => {
  isBatchDelete.value = true;
};

const emit = defineEmits<{
  (e: "selectionChange", value: any): void;
  (e: "addData"): void;
  (e: "deleteData", value: any): void;
  (e: "editData", value: any): void;
  (e: "setTop", value: any): void;
  (e: "batchDelete", value: any): void;
  (e: "endDrag", newINdex: number, oldIndex: number): void;
  (e: "copy", value: any): void;
  (e: "selectionClear"): void;
}>();

const handleBatchDelete = () => {
  emit("batchDelete", batchDeleteIds.value);
};

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

const setTop = (row: any) => {
  emit("setTop", row);
};

const copy = (row: any) => {
  emit("copy", row);
};
//拖拽
const rowDropInit = (className: string) => {
  const wrapperRow = document.querySelector(
    className + " .el-table__body-wrapper tbody"
  );
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
      emit("endDrag", newIndex, oldIndex);
    },
  });
};

defineExpose({
  handleSelectionClear,
});

onMounted(() => {
  rowDropInit(".dragTable");
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
