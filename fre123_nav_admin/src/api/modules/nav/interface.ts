// 定义接口
//基本信息配置的数据结构字段
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
  _id: string;
  group_name: string;
  style: number;
  style_des: string;
  tab_list: TabItem[];
}

//查询接口
export interface navGet {
  group_name: string;
  status: number;
  page: number;
  page_size: number;
}
//更新接口

export type DataType = TabDetail | TabItem | GroupData;

export interface IRequestBody {
  _id: string;
  group_name: string;
  style: string;
  style_des: string;
  group_name_url?: string;
  tab_list?: DataType;
}
//新增的接口
export interface navInsert {
  group_name: string;
  style: string;
  style_des: string;
  tab_list?: DataType;
  group_name_url?: string;
}

//删除接口
export interface navDelate {
  ids: string[];
}
