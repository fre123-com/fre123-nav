<template>
  <MetaSearchBar
    :formItems="props.formItems"
    :modelValue="topSearchData"
    @onSearch="searchData(true)"
    @onRefresh="refreshBtn()"
  >
    <template #searchInput>
      <el-input
        :clearable="true"
        v-model="topSearchData.name"
        style="width: 200px"
        placeholder="请输入友链名字"
        @clear="friendshipLinkApi.refresh('刷新成功')"
        @keyup.enter="searchData(true)"
      />
    </template>
  </MetaSearchBar>

  <div class="data-show-number">
    <el-icon size="large" color="#409EFF" style="margin-right: 10px">
      <Promotion />
    </el-icon>
    友链数量：{{ props.tableList.length }}
  </div>

  <div>
    <el-tabs
      style="display: block; width: 100%"
      v-model="tabName"
      tab-position="left"
      @tab-click="handleTabClick"
      class="demo-tabs"
    >
      <el-tab-pane label="全部" name="全部">
        <MetaTable
          v-if="tabActiveName === '全部'"
          max-height="550"
          :is-loading="props.loading"
          :tableData="props.tableList"
          :propList="props.propList"
          @addData="dialogs[0].isVisible = true"
          @deleteData="deleteWebs"
          @editData="editGetOp"
          :operateWidth="operateWidth"
        >
          <template #logo_url="{ row }">
            <img :src="row.logo_url" alt="img" style="height: 30px" />
          </template>
          <template #url="{ row }">
            <a :href="row.url" target="_blank" class="custom-link">{{
              row.url
            }}</a>
          </template>
          <template #created_at="{ row }">
            <text>{{
              friendshipLinkApi.formatUnixTimestamp(row.created_at)
            }}</text>
          </template>
          <template #updated_at="{ row }">
            <text>{{
              friendshipLinkApi.formatUnixTimestamp(row.updated_at)
            }}</text>
          </template>
          <template #status="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              :loading="switchLoading"
              @click="switchChange(row)"
            ></el-switch>
          </template>
        </MetaTable>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in typeDataShow"
        :key="index"
        :label="item.name"
        :name="item.name"
      >
        <MetaTable
          @confirmDrag="updateNewSort"
          :isDraggable="true"
          :key="metaTableKey"
          v-if="item.name === tabActiveName"
          max-height="550"
          :is-loading="props.loading"
          :tableData="props.tableList"
          :propList="props.propList"
          @addData="dialogs[0].isVisible = true"
          @deleteData="deleteWebs"
          @editData="editGetOp"
          :rowKey="item.type_id"
          @setTop="upTop"
          :operateWidth="operateWidth"
        >
          <template #logo_url="{ row }">
            <img :src="row.logo_url" alt="img" style="height: 30px" />
          </template>
          <template #url="{ row }">
            <a :href="row.url" target="_blank" class="custom-link">{{
              row.url
            }}</a>
          </template>
          <template #created_at="{ row }">
            <text>{{
              friendshipLinkApi.formatUnixTimestamp(row.created_at)
            }}</text>
          </template>
          <template #updated_at="{ row }">
            <text>{{
              friendshipLinkApi.formatUnixTimestamp(row.updated_at)
            }}</text>
          </template>
          <template #status="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              :loading="switchLoading"
              @click="switchChange(row)"
            ></el-switch>
          </template>
        </MetaTable>
      </el-tab-pane>
    </el-tabs>
  </div>

  <!-- 使用 v-for 渲染多个 WebDialog 组件 -->
  <WebDialog
    v-for="dialog in dialogs"
    :key="dialog.id"
    :id="dialog.id"
    :web-op="op"
    :rules="opRules"
    :title="dialog.title"
    :icon-type="dialog.iconType"
    :finishBtn="dialog.finishBtn"
    v-model="dialog.isVisible"
    :type-finish-dialog="typeFinishDialog"
    :clean-dialog="cleanDialog"
  />
</template>

<script lang="ts" setup>
import friendShipApi from "@/api/modules/friendship_link";
import { infoMessage, successMessage } from "@/utils/notifications";
import {
  friendshipLinkApi,
  metaTableKey,
  opForm,
  rowDataShow,
  tabActiveName,
  tabName,
  topSearchData,
  typeDataShow,
} from "@/views/friendship_link";
import WebDialog from "@/views/friendship_link/components/WebDialog.vue";
import { dialogs, opRules } from "@/views/friendship_link/config/friendshipTop";
import { ref, watch } from "vue";
import MetaSearchBar from "../../../components/MetaSearchBar/index.vue";
import MetaTable from "../../../components/MetaTable/index.vue";

// 使用类型注解来定义 props
const props = defineProps<{
  tableList: any[]; // 使用数组类型注解，而不是 Array<any>
  loading: boolean;
  formItems: any[];
  propList: any[];
}>();

watch(
  () => topSearchData.value.status,
  () => {
    searchData(false);
  }
);

const typeTabId = ref();
// 点击不同标签页
const handleTabClick = async (activeName: any) => {
  tabActiveName.value = activeName.props.label;
  if (tabActiveName.value !== "全部")
    typeTabId.value = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === tabActiveName.value
    )[0]._id;
  searchData(false);
  setTimeout(() => {
    dragKey.value++;
  }, 0);
};

/**
 * @name 搜索数据
 */
const searchData = async (massage: boolean) => {
  try {
    friendshipLinkApi.handleTabClickUse();
    topSearchData.value.name = topSearchData.value.name.trim();
    if (topSearchData.value.name !== "")
      rowDataShow.value = rowDataShow.value.filter((obj) =>
        obj.name.toLowerCase().includes(topSearchData.value.name)
      );
  } catch {
    console.log("搜索发生了错误");
  }
};

// 操作数组
const op = ref<any>({
  row_id: "",
});
// 清空弹窗
const cleanDialog = () => {
  dialogs.value.forEach((e) => {
    e.isVisible = false;
  });
  op.value = {
    row_id: "",
  };
  originType = "";
  opForm.value.resetFields(); // 重置字段和验证状态
};

/**
 * @name 点击编辑获取该条友链数据
 */
const editGetOp = (row: any) => {
  dialogs.value[1].isVisible = true;
  op.value = { ...row };
  console.log(op.value);
  originType = row.type;
};

const opToApiChecked = (list: any) => {
  list.forEach((e: any) => {
    delete e.created_at;
    delete e.updated_at;
  });
};

// 备份原有类型，方便判断是否更换了row的新类型
let originType = "";
const changeType = ref(false);
/**
 * @name 弹窗确认按钮
 */
const typeFinishDialog = async (id: string) => {
  try {
    await friendshipLinkApi.validateForm((valid) => {
      if (valid) {
        if (id === "add") {
          addWebs();
        } else {
          updateWebs();
        }
      } else {
        console.log("表单验证失败");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// 点击switch开关调用接口
const switchLoading = ref(false);
const switchChange = async (row: any) => {
  try {
    switchLoading.value = true;
    op.value = { ...row };
    let statusArr: any[] = [];
    typeTabId.value = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === op.value.type
    )[0]._id;
    statusArr = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === op.value.type
    )[0].list;
    statusArr = statusArr.map((item) => {
      if (item.row_id === op.value.row_id) return op.value;
      return item;
    });
    opToApiChecked(statusArr);
    await friendShipApi.updateUser({
      _id: typeTabId.value,
      name: op.value.type,
      list: statusArr,
    });
    await friendshipLinkApi.getApiData();
    switchLoading.value = false;
    friendshipLinkApi.handleTabClickUse();
    op.value = {
      row_id: "",
    };
  } catch {
    console.log("status改变错误");
  }
};

const addWebs = async () => {
  try {
    let addArr = [];
    typeTabId.value = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === op.value.type
    )[0]._id;
    addArr = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === op.value.type
    )[0].list;
    op.value.row_id = Math.random().toString();
    addArr.push(op.value);
    opToApiChecked(addArr);
    await friendShipApi.updateUser({
      _id: typeTabId.value,
      name: op.value.type,
      list: addArr,
    });
    await friendshipLinkApi.getApiData();
    successMessage("添加成功");
    friendshipLinkApi.handleTabClickUse();
    cleanDialog();
  } catch {
    console.log("数据添加错误");
  }
};

// web更新操作
const updateWebs = async () => {
  try {
    // 不改变类型type的情况下，都属于编辑，不需要传targetType
    // 改变type的情况下，需要先生成，再删除原有旗下type的list
    let updateArr: any[] = [];
    // 判断是否改变了类型type
    changeType.value = op.value.type !== originType ? true : false;
    if (changeType.value === true) {
      const originRowId = op.value.row_id;
      try {
        let delArr: any[] = [];
        typeTabId.value = typeDataShow.value.filter(
          (obj: { name: any }) => obj.name === originType
        )[0]._id;
        delArr = typeDataShow.value.filter(
          (obj: { name: any }) => obj.name === originType
        )[0].list;
        delArr = delArr.filter((obj) => obj.row_id !== op.value.row_id);
        opToApiChecked(delArr);
        await friendShipApi.updateUser({
          _id: typeTabId.value,
          name: originType,
          list: delArr,
        });
      } catch {
        console.log("数据删除错误");
      }
      // 属于创建，先在目标类型生成新row
      op.value.row_id = originRowId;
    }
    // 获取添加or更新的数据
    typeTabId.value = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === op.value.type
    )[0]._id;
    updateArr = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === op.value.type
    )[0].list;
    updateArr = updateArr.map((item) => {
      if (item.row_id === op.value.row_id) return op.value;
      return item;
    });
    if (changeType.value) updateArr.push(op.value);
    opToApiChecked(updateArr);
    await friendShipApi.updateUser({
      _id: typeTabId.value,
      name: op.value.type,
      list: updateArr,
    });
    await friendshipLinkApi.getApiData();
    successMessage("编辑成功");
    cleanDialog();
    friendshipLinkApi.handleTabClickUse();
  } catch {
    console.log("数据更新错误");
  }
};

// web删除操作
const deleteWebs = async (row: any) => {
  try {
    let delArr: any[] = [];
    typeTabId.value = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === row.type
    )[0]._id;
    delArr = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === row.type
    )[0].list;
    delArr = delArr.filter((obj) => obj.row_id !== row.row_id);
    opToApiChecked(delArr);
    await friendShipApi.updateUser({
      _id: typeTabId.value,
      name: row.type,
      list: delArr,
    });
    await friendshipLinkApi.getApiData();
    successMessage("删除成功");
    friendshipLinkApi.handleTabClickUse();
  } catch (error) {
    console.log("数据删除错误", error);
  }
};

/**
 * @name 网址置顶
 */
const upTop = async (row: any) => {
  try {
    let upArr: any[] = [];
    upArr = typeDataShow.value.filter(
      (obj: { name: any }) => obj.name === row.type
    )[0].list;
    upArr = upArr.filter((obj: any) => obj.name !== row.name);
    upArr.unshift(row);
    opToApiChecked(upArr);
    await friendShipApi.updateUser({
      _id: typeTabId.value,
      name: row.type,
      list: upArr,
    });
    await friendshipLinkApi.getApiData();
    metaTableKey.value++;
    successMessage("置顶成功");
    await friendshipLinkApi.handleTabClickUse();
    changeDragStatus();
  } catch (error) {
    // 可以选择将错误信息传递给用户或记录日志
    infoMessage("拖拽出错,已撤销");
    await friendshipLinkApi.refresh("撤销成功");
    await friendshipLinkApi.handleTabClickUse();
  }
};

const operateWidth = ref(100);
//点击保存数据按钮，对数据进行保存操作
const updateNewSort = async (list: any) => {
  try {
    operateWidth.value = 100;
    opToApiChecked(list);
    if (rowDataShow.value[0].type) {
      await friendShipApi.updateUser({
        _id: typeTabId.value,
        name: rowDataShow.value[0].type,
        list: list,
      });
    }
    await friendshipLinkApi.refresh("保存成功");
    friendshipLinkApi.handleTabClickUse();
  } catch (error) {
    infoMessage("拖拽出错,已撤销");
    await friendshipLinkApi.refresh("撤销成功");
    await friendshipLinkApi.handleTabClickUse();
    operateWidth.value = 100;
    return;
  }
};
const dragKey = ref(0);

//重置拖拽数据
const initDragGroup = async (ifRefresh: boolean) => {
  operateWidth.value = 100;
  if (ifRefresh === true) await friendshipLinkApi.getApiData();
  if (ifRefresh === true) infoMessage("已撤销");
  metaTableKey.value++;
  friendshipLinkApi.handleTabClickUse();
};

//修改拖拽锁定状态
const changeDragStatus = () => {
  cleanTopSearchData();
  operateWidth.value = 140;
};
// 刷新
const refreshBtn = async () => {
  cleanTopSearchData();
  await friendshipLinkApi.refresh("刷新成功");
  operateWidth.value = 100;
  initDragGroup(false);
  friendshipLinkApi.handleTabClickUse();
};
// 清空
const cleanTopSearchData = () => {
  topSearchData.value = {
    name: "",
    status: -1,
  };
};
</script>

<style scoped>
.is-disabled {
  pointer-events: none;
  /* 阻止鼠标事件 */
  opacity: 0.5;
}

.custom-link {
  text-decoration: none;
  /* 移除下划线 */
  color: black;
}

.custom-link:hover {
  color: #007bff;
  /* 蓝色，或者你喜欢的颜色 */
  text-decoration: underline;
  /* 如果需要，可以添加下划线 */
}
</style>
