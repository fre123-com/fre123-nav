import { successMessage } from "@/utils/notifications";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import friendShipApi from "../../api/modules/friendship_link";
import { IFriendShipItemRow } from "../../api/modules/friendship_link/interface";
// 定义用于操作的总数组和展示数组和类别数组和全空便于植入的数组
// 调接口后的types接收数据
export const typeDataShow = ref<any>();
export const jsonAll = ref<any>();
export const rowDataShow = ref<IFriendShipItemRow[]>([]);
export const staticRowData = ref<IFriendShipItemRow[]>([]);
// 启用状态的value
export const allStatus = ref([
  {
    label: "全部",
    value: -1,
  },
  {
    label: "启用中",
    value: 1,
  },
  {
    label: "未启用",
    value: 0,
  },
]);
// 刷新判断
export const loading = ref(false);
// 获取表单模板，进行表单校验
export const opForm = ref();
// tab标签页选择判断
export const activeName = ref("type");
export const topSearchData = ref({
  name: "",
  status: -1,
});
export const metaTableKey = ref(0);
export const tabActiveName = ref<any>("全部");
export const tabName = ref("全部");

// 暴露api接口
export const friendshipLinkApi = {
  formatUnixTimestamp: (timestampInSeconds: number) => {
    // 首先，将秒级时间戳转换为毫秒级时间戳
    var milliseconds = timestampInSeconds * 1000;

    // 使用Date对象
    var date = new Date(milliseconds);

    // 格式化日期时间
    // 注意：这里使用的是简单的格式化方式，你可以根据需要调整格式
    var formattedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2);
    return formattedDate;
  },

  getUnixTimestampInSeconds: () => {
    // 获取当前的毫秒级时间戳
    var milliseconds = Date.now();

    // 转换毫秒时间为秒
    var seconds = Math.floor(milliseconds / 1000);

    return seconds;
  },

  /**
   * @name  获取总数据、展示数据和类别
   */
  getApiData: async () => {
    try {
      const getApiData = await friendShipApi.getFriendShipList({
        name: "",
      });
      jsonAll.value = [];
      typeDataShow.value = [];
      rowDataShow.value = [];
      staticRowData.value = [];
      let data = <any>{
        data: {
          total: 1,
          rows: [
            /* ... 一些IRow对象 ... */
          ],
        },
        info: "ok",
        status: 0,
      };
      if (getApiData) data = getApiData;
      if (data) {
        // 类别表格赋值
        jsonAll.value = data;
        typeDataShow.value = data.data.rows;
      }
      // 网址表格赋值
      typeDataShow.value.forEach((e: any) => {
        e.count = e.list?.length;
        e.list?.forEach((row: any) => {
          row.type = e.name;
          rowDataShow.value.push(row);
          staticRowData.value.push(row);
        });
      });
      await friendshipLinkApi.handleTabClickUse();
    } catch {
      console.log("接口连接出现问题");
    }
  },
  /**
   * @name 操作后的数据刷新
   */
  refresh: async (massage: string) => {
    console.log("finish refresh");
    loading.value = true;
    setTimeout(async () => {
      await friendshipLinkApi.getApiData();
      metaTableKey.value++;
      loading.value = false;
      successMessage(`${massage}`);
    }, 300);
    return;
  },

  // 每次搜索或者其他分类操作需要保持标签页数据正确
  handleTabClickUse: async () => {
    if (tabActiveName.value === "全部") {
      rowDataShow.value = staticRowData.value;
    } else {
      rowDataShow.value = staticRowData.value.filter(
        (obj) => obj.type === tabActiveName.value
      );
    }
    friendshipLinkApi.ifStatus(topSearchData.value.status);
    return;
  },
  /**
   * @name 筛选是否启用
   */
  ifStatus: async (statusChoose: number) => {
    if (statusChoose === 1)
      rowDataShow.value = rowDataShow.value.filter((obj) => obj.status === 1);
    if (statusChoose === 0)
      rowDataShow.value = rowDataShow.value.filter((obj) => obj.status === 0);
  },
  /**
   * @name 信息判断函数
   */
  showMessage: async (
    type: "success" | "info" | "warning",
    message: string
  ) => {
    ElMessage({
      type,
      message,
    });
  },

  /**
   * @name 操作信息成功的判断，成功则调用函数，取消则进行取消信息的展示
   */
  showConfirmation: async (message: string, onConfirm: () => void) => {
    await ElMessageBox.confirm(message, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(onConfirm)
      .catch(() => {});
  },
  /**
   * @name 表单校验函数
   */
  validateForm: async (callback: (valid: boolean) => void) => {
    await opForm.value.validate((valid: boolean, fields: any) => {
      callback(valid);
    });
  },
};
