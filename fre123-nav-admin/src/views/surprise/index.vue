<template>
  <CommonWrapper>
    <MetaSearchBar
      :formItems="searchFormItems"
      :modelValue="surpriseParams"
      @onSearch="getSurpriseData"
      @onRefresh="handleRefreshData"
    >
      <template #time_range="">
        <el-date-picker
          v-model="startTsRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 250px"
        ></el-date-picker>
      </template>
    </MetaSearchBar>
    <div class="ad-list">
      <MetaTable
        :data="surpriseData"
        :tableData="surpriseData ?? []"
        :showSelection="false"
        :propList="PendantPropList"
        width="100%"
        :isLoading="isSurpriseLoading"
        :showBatchDelete="true"
        :operateWidth="150"
        @addData="openAddAdDialog"
        @editData="openEditAdDialog"
        @deleteData="deleteSingleAds"
        @batchDelete="batchDeleteAds"
        @selectionChange="handleSelectionChange"
      >
        <template #type_class="{ row }">
          <div>
            {{ formatSurpriseType(row.type) }}
          </div>
        </template>
        <template #description="{ row }">
          <div class="text-ellipsis">{{ row.description }}</div>
        </template>
        <template #img_url="{ row }">
          <el-image
            v-if="row.img_url"
            :src="row.img_url"
            alt="广告图片"
            class="ad-image"
            style="cursor: pointer"
            @click="openImageViewer(row.img_url)"
          />
        </template>
        <template #allowed_close="scope">
          <el-switch
            v-model="scope.row.allowed_close"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="handleChangeContent(scope.row, 'allowed_close')"
          ></el-switch>
        </template>
        <template #web_path="{ row }">
          <div>
            {{ formatSurpriseWebPath(row.web_path) }}
          </div>
        </template>
        <template #is_show="scope">
          <el-switch
            v-model="scope.row.is_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="handleChangeContent(scope.row, 'is_show')"
            popper-class="no-border-select"
          >
          </el-switch>
        </template>
        <template #position="{ row }">
          <dev>
            {{ formatSurprisePosition(row.position) }}
          </dev>
        </template>
        <template #start_ts="{ row }">
          <span>{{ formatDate(row.start_ts) }}</span>
        </template>
        <template #end_ts="{ row }">
          <span>{{ formatDate(row.end_ts) }}</span>
        </template>
        <template #url="{ row }">
          <a :href="row.url" target="_blank" class="link-ellipsis">{{
            row.url
          }}</a>
        </template>
        <template #operateBtn="slotProps">
          <ElTooltip :enterable="false" content="详情" effect="light">
            <el-button
              circle
              :color="META_SUCCESS"
              @click="viewDetails(slotProps.row)"
            >
              <template #icon>
                <el-icon color="#fff">
                  <View />
                </el-icon>
              </template>
            </el-button>
          </ElTooltip>
        </template>
      </MetaTable>
    </div>
    <MetaPagination
      :totalCount="dataLength"
      :currentPage="surpriseParams.page"
      :pageSize="surpriseParams.page_size"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
    />

    <AdDetailsDialog
      v-model="detailsDialogVisible"
      :current-ad="currentAd"
      @update:show-detail="handleDetailsDialogVisibility"
    />

    <AdEditDialog
      v-model="showAddDialog"
      :adItem="currentAdData"
      :isEditMode="isEditMode"
      @update:show-add="updateShowAddDialog"
      @refresh:data="handleRefreshData"
    />

    <teleport to="body">
      <el-image-viewer
        v-if="imageViewerActive"
        :url-list="previewSrcList"
        :index="currentImageIndex"
        @close="handleImageViewerClose"
      />
    </teleport>
  </CommonWrapper>
</template>

<script setup lang="ts">
import surpriseApi from "@/api/modules/surprise/index";
import { ISurpriseListItem } from "@/api/modules/surprise/interface";
import MetaPagination from "@/components/MetaPagination/index.vue";
import MetaSearchBar from "@/components/MetaSearchBar/index.vue";
import MetaTable from "@/components/MetaTable/index.vue";
import { META_SUCCESS } from "@/config/const";
import { useSurpriseListStore } from "@/store/modules/surprise";
import {
  convertToTimestamp,
  formatDate,
  timestampToDate,
} from "@/utils/formateTime";
import { errorMessage, successMessage } from "@/utils/notifications";
import AdDetailsDialog from "@/views/surprise/components/AdDetailDialog.vue";
import AdEditDialog from "@/views/surprise/components/AdEditDialog.vue";
import { searchFormItems } from "@/views/surprise/config/formConfig";
import { PendantPropList } from "@/views/surprise/config/tableConfig";
import {
  formatSurprisePosition,
  formatSurpriseType,
  formatSurpriseWebPath,
} from "@/views/surprise/index";
import { defineEmits, onMounted, reactive, ref, Ref, watch } from "vue";
const {
  surpriseParams,
  refetchSurpriseList,
  surpriseListData,
  isSurpriseLoading,
} = useSurpriseListStore();

console.log("surpriseParams", surpriseParams.value);

const surpriseData: Ref<ISurpriseListItem[]> = ref([]);
const dataLength = ref(0); // 存储数据总长度

// 初始化查询参数
const initSurpriseParams = () => {
  surpriseParams.value = {
    title: "",
    is_show: -1,
    type: -1,
    position: -1,
    web_path: "all",
    start_ts_range: [] as number[],
    page: 1,
    page_size: 10,
  };
};

const startTsRange = ref();

// 获取广告数据
const getSurpriseData = async () => {
  // TODO 这里可以初始化你想要的数据
  await refetchSurpriseList.value();
  surpriseData.value = surpriseListData.value?.data
    ?.rows as ISurpriseListItem[];
  dataLength.value = surpriseListData.value?.data?.total as number;
};

// 表格数据
//传送的事件
const emit = defineEmits({
  adData: null,
  submit: null,
  "refresh:data": null,
});

// 控制编辑/添加对话框的显示状态
const showAddDialog = ref(false); // 控制添加广告对话框显示
const currentAdData = ref({} as ISurpriseListItem); // 当前编辑的广告数据
const isEditMode = ref(false); // 是否处于编辑模式

const openAddAdDialog = () => {
  showAddDialog.value = true;
  isEditMode.value = false;
};

const openEditAdDialog = (row: ISurpriseListItem) => {
  showAddDialog.value = true;
  isEditMode.value = true;
  currentAdData.value = reactive({
    ...row,
    start_ts: timestampToDate(row.start_ts),
    end_ts: timestampToDate(row.end_ts),
  });
};

const updateShowAddDialog = (value: boolean) => {
  showAddDialog.value = value;
};

// 查看详情对话框状态
const detailsDialogVisible = ref(false);
const currentAd = ref({});
const viewDetails = (row: ISurpriseListItem) => {
  if (row) {
    currentAd.value = { ...row };
    detailsDialogVisible.value = true;
  }
};
//处理详情页的关闭
const handleDetailsDialogVisibility = (visible: boolean) => {
  detailsDialogVisible.value = visible;
};

// 处理内容的开关
const handleChangeContent = async (
  row: ISurpriseListItem,
  propertyName: keyof ISurpriseListItem
) => {
  if (!row._id) {
    return false;
  }
  const propertyValue = ref(row[propertyName]);
  if (propertyValue.value === 1) {
    propertyValue.value = 0;
  } else {
    propertyValue.value = 1;
  }

  const newRow = {
    ...row,
    [propertyName]: propertyValue.value,
  };
  if (newRow) {
    await surpriseApi.updateSurprise(newRow);
    getSurpriseData();
    successMessage("修改成功");
  }
};

const selectedRowIds = ref<string[]>([]); // 存储被选中的广告项的 id
// 选中变更处理器
const handleSelectionChange = (val: Array<{ _id: string }>) => {
  selectedRowIds.value = val.map((item) => item._id);
};

// 批量删除函数
const batchDeleteAds = async () => {
  if (selectedRowIds.value.length === 0) {
    errorMessage("请选择至少一个广告进行删除");
    return;
  }
  try {
    await surpriseApi.delSurprise({ ids: selectedRowIds.value as any });
    await handleRefreshData();
    successMessage("批量删除成功");
  } catch (error) {
    errorMessage("批量删除失败");
  } finally {
    // 清空选中的ID
    selectedRowIds.value = [];
  }
};

// 删除单个广告
const deleteSingleAds = async (row: any) => {
  try {
    await surpriseApi.delSurprise({ ids: [row._id] as any }); // 使用类型转换
    successMessage("删除成功");
    handleRefreshData();
  } catch (error) {
    errorMessage("删除失败");
  }
};
//刷新
const handleRefreshData = async () => {
  initSurpriseParams();
  getSurpriseData();
};

watch(
  () => [
    surpriseParams.value.position,
    surpriseParams.value.is_show,
    surpriseParams.value.web_path,
    startTsRange.value,
  ],
  async () => {
    if (startTsRange.value.length) {
      surpriseParams.value.start_ts_range = [
        convertToTimestamp(startTsRange.value[0]),
        convertToTimestamp(startTsRange.value[1]),
      ];
    }

    await getSurpriseData();
  }
);

// 翻页时更新当前页码
const handleCurrentChange = async (newPage: number) => {
  surpriseParams.value.page = newPage;
  await getSurpriseData();
};

// 改变每页显示条数时更新每页大小
const handleSizeChange = async (newSize: number) => {
  surpriseParams.value.page_size = newSize;
  surpriseParams.value.page = 1;
  await getSurpriseData();
};

//
// 图片预览激活状态
const imageViewerActive = ref(false);
// 预览图片的数组
const previewSrcList = ref<string[]>([]);
// 当前预览的图片索引
const currentImageIndex = ref(0);

// 打开图片预览
const openImageViewer = (url: any) => {
  imageViewerActive.value = true;
  previewSrcList.value = [url]; // 仅包含点击的图片
  currentImageIndex.value = 0; // 索引指向第一张图片
};

// 关闭图片预览
const handleImageViewerClose = () => {
  imageViewerActive.value = false;
  previewSrcList.value = [];
  currentImageIndex.value = 0;
};

onMounted(async () => {
  // 初始化查询参数
  // await initSurpriseParams();
  await getSurpriseData();
});
</script>

<style scoped>
.export-button {
  color: #fff;
}

.text-ellipsis {
  white-space: nowrap;
  /* 文本不换行 */
  overflow: hidden;
  /* 隐藏溢出的内容 */
  text-overflow: ellipsis;
  /* 文本溢出显示省略号 */
}

.link-ellipsis {
  color: inherit;
  text-decoration: none;
}

.link-ellipsis:hover {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}

.ad-image {
  width: auto;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
