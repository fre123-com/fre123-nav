import { ref } from "vue";
import { allStatus } from "..";
import { InputType } from "@/components";

// 解决了难的bug，应该是导入这个包的优先级的时间太高，且MateSearchBar的组件车传值，应该用ref定义，通过监听类型变化不断改变
// 为何我onMounted调用了接口，allStatus却先在没有赋值的情况下被导出，导致bug出现
export const urlTop = ref();
urlTop.value = [
  {
    label: "友链名字:",
    field: "name",
    labelLeftWidth: "80px",
    slotName:'searchInput'
  },

  {
    label: "友链启用:",
    field: "status",
    labelLeftWidth: "80px",
    labelWidth: "200px",
    type: InputType.select,
    options: allStatus.value,
  },
];

export const typeList = [
  {
    prop: "name",
    label: "友链类别",
    align: "center",
    slotName: "name",
  },
  {
    prop: "count",
    label: "网址数量",
    minWidth: "80px",
    align: "center",
    slotName: "count",
  },
  {
    prop: "created_at",
    label: "创建时间",
    align: "center",
    slotName: "created_at",
  },
  {
    prop: "status",
    label: "是否展示",
    align: "center",
    slotName: "status",
  },
];

export const urlList = [
  {
    prop: "name",
    label: "名字",
    align: "center",
    slotName: "name",
  },
  {
    prop: "type",
    label: "类别",
    minWidth: "80px",
    align: "center",
    slotName: "type",
  },
  {
    prop: "logo_url",
    label: "图标",
    align: "center",
    slotName: "logo_url",
  },
  {
    prop: "url",
    label: "友链网址",
    showOverflowTooltip: true,
    align: "center",
    slotName: "url",
  },
  {
    prop: "description",
    label: "友链概述",
    showOverflowTooltip: true,
    align: "center",
    slotName: "description",
  },
  {
    prop: "created_at",
    label: "创建时间",
    align: "center",
    slotName: "created_at",
  },
  {
    prop: "updated_at",
    label: "更新时间",
    align: "center",
    slotName: "updated_at",
  },
  {
    prop: "status",
    label: "是否展示",
    align: "center",
    slotName: "status",
  },
];

// 表单校验的规则
export const opRules = {
  type: [{ required: true, message: "请选择类别", trigger: "blur" }],
  name: [{ required: true, message: "请输入名字", trigger: "blur" }],
  url: [
    { required: true, message: "请输入网址", trigger: "blur" },
    { type: "url", message: "网址格式不正确", trigger: "blur" },
  ],
  logo_url: [
    { required: true, message: "请输入图标网址", trigger: "blur" },
    { type: "url", message: "图标网址格式不正确", trigger: "blur" },
  ],
  description: [{ required: true, message: "请输入描述", trigger: "blur" }],
  // 可用状态的验证可以根据具体需求添加
};

// 对话框数组
export const dialogs = ref([
  {
    id: "webAdd",
    title: "友情链接网址添加",
    iconType: "CirclePlus",
    isVisible: false,
    finishBtn: "添加",
  },
  {
    id: "webEdit",
    title: "友情链接网址编辑",
    iconType: "Edit",
    isVisible: false,
    finishBtn: "更改",
  },
  {
    id: "typeAdd",
    title: "友情链接类别添加",
    iconType: "CirclePlus",
    isVisible: false,
    finishBtn: "添加",
  },
  {
    id: "typeEdit",
    title: "友情链接类别编辑",
    iconType: "Edit",
    isVisible: false,
    finishBtn: "更改",
  },
]);
