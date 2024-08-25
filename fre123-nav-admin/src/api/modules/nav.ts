// fetchData.ts

import { ElNotification } from "element-plus";
import { ref } from "vue";

// 定义接口
export interface TabDetail {
  title: string;
  ori_url: string;
  url: string;
  icon: string;
  description: string;
  suffix: boolean;
  is_show: number;
}

export interface TabItem {
  tab_name: string;
  upper_right_corner: {
    title: string;
    url: string;
  };
  details: TabDetail[];
}

export interface GroupData {
  group_name: string;
  style: number;
  style_des: string;
  tab_list: TabItem[];
}

// 使用 ref 创建响应式数据
export const tableData = ref<GroupData[]>([]);

// 使用 fetch 获取数据
export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/fre123-com/fre123-nav/main/config/nav.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const newData = await response.json();
    localStorage.setItem("myData", JSON.stringify(newData));
    // tableData.value = await newData;
  } catch (error) {
    console.error("Error fetching new data:", error);
  }
};
// 下面是校验规则----------------------------------------------------------------------------------

const urlPattern =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+{}]*)*(\?[;&a-z\d%_.~+=-{}]*)?(\#[-a-z\d_{}]*)?$/i;
const validateHttpsLink = (rule: any, value: string) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!/^https:\/\//.test(value)) {
    return Promise.reject("链接地址请以 https:// 开头");
  }
  if (!urlPattern.test(value)) {
    return Promise.reject("链接地址格式不正确");
  }
  return Promise.resolve();
};

export const rules = {
  baseRules: {
    nav_id: [{ required: true, message: "请输入id名称", trigger: "blur" }],
    group_name: [
      { required: true, message: "请输入分类名称", trigger: "blur" },
    ],
    style_des: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    group_name_url: [
      { required: false, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    tab_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    tab_name_url: [
      { required: false, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    title: [{ required: true, message: "请输入名称", trigger: "blur" }],
    url: [
      { required: true, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    icon: [
      { required: true, message: "请输入图片地址", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    description: [{ required: true, message: "请输入描述1", trigger: "blur" }],
  },
  changeRules: {
    group_name: [
      { required: true, message: "请输入分类名称", trigger: "blur" },
    ],
    style_des: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    group_name_url: [
      { required: false, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    tab_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    tab_name_url: [
      { required: false, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    title: [{ required: true, message: "请输入名称", trigger: "blur" }],
    url: [
      { required: true, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    icon: [
      { required: true, message: "请输入图片地址", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    description: [{ required: true, message: "请输入描述1", trigger: "blur" }],
  },
  newRules: {
    group_name: [
      { required: true, message: "请输入分类名称", trigger: "blur" },
    ],
    style_des: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    group_name_url: [
      { required: false, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    tab_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    tab_name_url: [
      { required: false, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    title: [{ required: true, message: "请输入名称", trigger: "blur" }],
    url: [
      { required: true, message: "请输入网站域名", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    icon: [
      { required: true, message: "请输入图片地址", trigger: "blur" },
      { validator: validateHttpsLink, trigger: "blur" },
    ],
    description: [{ required: true, message: "请输入描述1", trigger: "blur" }],
  },
};
//-------------------------------------------
export const openSuccessNew = () => {
  ElNotification({
    title: "Success",
    message: "成功添加",
    type: "success",
    duration: 1500,
  });
};
export const openSuccessEdit = () => {
  ElNotification({
    title: "Success",
    message: "成功修改",
    type: "success",
    duration: 1500,
  });
};
export const openWaring = () => {
  ElNotification({
    message: "请输入正确的格式",
    type: "warning",
    duration: 1500,
  });
};
export const previewWaring = () => {
  ElNotification({
    message: "没有内容",
    type: "warning",
    duration: 1500,
  });
};
