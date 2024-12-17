export const searchFormItems = [
  {
    label: "广告标题:",
    field: "title",
    labelLeftWidth: "75px",
    labelWidth: "200px",
    type: 0,
    otherOptions: {
      clearable: true,
      placeholder: "请输入广告标题",
    },
  },
  {
    label: "是否展示:",
    field: "is_show",
    labelLeftWidth: "75px",
    labelWidth: "200px",
    type: 2,
    options: [
      {
        label: "全部",
        value: -1,
      },
      {
        label: "展示",
        value: 1,
      },
      {
        label: "不展示",
        value: 0,
      },
    ],
  },
  {
    label: "广告位置:",
    field: "position",
    labelLeftWidth: "75px",
    labelWidth: "200px",
    type: 2,
    options: [
      {
        label: "全部",
        value: -1,
      },
      {
        label: "居中弹窗",
        value: 1,
      },
      {
        label: "右下角",
        value: 2,
      },
    ],
  },
  {
    label: "投放页面:",
    field: "web_path",
    labelLeftWidth: "75px",
    labelWidth: "200px",
    type: 2,
    options: [
      {
        label: "全部",
        value: "all",
      },
      {
        label: "所有页面",
        value: "global",
      },
      {
        label: "首页",
        value: "/",
      },
      {
        label: "搜索结果页",
        value: "/s",
      },
      {
        label: "详情页",
        value: "/d",
      },
    ],
  },
  {
    label: "开始时间:",
    labelLeftWidth: "75px",
    labelWidth: "200px",
    slotName: "time_range",
  },
];
