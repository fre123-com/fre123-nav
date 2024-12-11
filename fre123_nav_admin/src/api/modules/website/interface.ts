// 定义接口
//基本信息配置的数据结构字段
export interface IBaseForm {
  app_name: string;
  web_host: string;
  logo: string;
  icon: string;
}

//SEO配置的数据结构字段
export interface ISeo {
  title: string;
  description: string;
  keywords: string;
  statistics_baidu: string;
}

//搜索引擎数据结构字段要求
export interface IListItem {
  name: string;
  url: string;
  icon: string;
  is_show: number;
  placeholder: string;
}
export interface IHeaderSection {
  name: string;
  is_show: number;
  list: IListItem[];
}
//广告位数据结构字段要求——header下right子数据
export interface IChildItem {
  name: string;
  url: string;
  is_show: number;
}
export interface IHeaderGroup {
  is_show: number;
  group: {
    name: string;
    url: string;
    children: IChildItem[];
  };
}

//侧边栏的数据结构字段
export interface IPendantItem {
  is_show: number;
  icon_class: string;
  icon_size: number;
  icon_color: string;
  icon_hover_color: string;
  base64: string;
  text: string;
  img: string;
  url: string;
}
export interface IPendantData {
  is_show: number;
  list: IPendantItem[];
}

//尾部footer的数据结构字段
export interface IFooterItem {
  is_show: number;
  icon: string;
  icon_class: string;
  icon_size: number;
  url: string;
  img: string;
  text: string;
}
export interface IFooterRight {
  is_show: number;
  list: IFooterItem[];
}
export interface IFooterData {
  right: IFooterRight;
}

//定义数据结构来接收数据
export interface ISearchConfigItem {
  name: string;
  url: string;
  icon: string;
  placeholder: string;
}

export interface ISearchConfig {
  is_show: number;
  list: ISearchConfigItem[];
}

export interface IHeaderTotal {
  search_engine: IHeaderSection | any;
  right: IHeaderGroup[];
}

export interface websiteGet {
  type: string;
}

export type DataType =
  | IPendantData
  | IFooterData
  | IBaseForm
  | IHeaderTotal
  | ISeo
  | {};

export interface IRequestBody {
  type: string;
  data: DataType;
}

export interface ITableDataArrayHeaderSection {
  key: string;
  name: string;
  is_show: number;
  list: IListItem[];
}
