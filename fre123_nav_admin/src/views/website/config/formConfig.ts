import { fieldRules } from "@/views/website/index";

export const footerFields = [
  {
    label: "图标地址",
    model: "icon",
    type: "el-input",
    props: { rules: fieldRules.icon },
  },
  {
    label: "跳转链接",
    model: "url",
    type: "el-input",
    props: { rules: fieldRules.url },
  },
  {
    label: "Hover图片",
    model: "img",
    type: "el-input",
    props: { rules: fieldRules.img },
  },
  {
    label: "Hover文本",
    model: "text",
    type: "el-input",
    props: { rules: fieldRules.text },
  },
];

export const advertChildFields = [
  {
    label: "广告名称",
    model: "name",
    type: "el-input",
    props: { rules: fieldRules.name },
  },
  {
    label: "广告链接",
    model: "url",
    type: "el-input",
    props: { rules: fieldRules.url },
  },
];

export const SectionChildFields = [
  {
    label: "搜索引擎名称",
    model: "name",
    type: "el-input",
    props: { rules: fieldRules.name },
  },
  {
    label: "链接地址",
    model: "url",
    type: "el-input",
    props: { rules: fieldRules.url },
  },
  {
    label: "图标链接",
    model: "icon",
    type: "el-input",
    props: { rules: fieldRules.icon },
  },
  {
    label: "暗纹词",
    model: "placeholder",
    type: "el-input",
    props: { rules: fieldRules.placeholder },
  },
];

export const NewGroupFields = [
  {
    label: "搜索引擎分类",
    model: "newCategoryFieldName",
    type: "el-input",
    props: { rules: fieldRules.newCategoryName },
  },
  {
    label: "分类名称",
    model: "name",
    type: "el-input",
    props: { rules: fieldRules.name },
  },
];

export const EditGroupFields = [
  {
    label: "分类名称",
    model: "name",
    type: "el-input",
    props: { rules: fieldRules.newCategoryFieldName },
  },
];

export const AdvertAddGroupFields = [
  {
    label: "广告分组名称",
    model: "name",
    type: "el-input",
    props: { rules: fieldRules.name },
  },
  {
    label: "链接地址",
    model: "url",
    type: "el-input",
    props: { rules: fieldRules.url },
  },
];

export const AdvertEditGroupFields = [
  {
    label: "广告分组名称",
    model: "name",
    type: "el-input",
    props: { rules: fieldRules.name },
  },
];
