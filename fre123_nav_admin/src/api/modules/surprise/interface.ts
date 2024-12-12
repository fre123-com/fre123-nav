export interface ISurpriseListParams {
  title?: string;
  is_show?: number;
  position?: number;
  web_path?: string;
  start_ts_range?: number[];
  page?: number;
  page_size?: number;
}
export interface ISurpriseListItem {
  _id?: string;
  created_at: number;
  updated_at: number;
  description: string;
  start_ts: number;
  end_ts: number;
  img_url: string;
  position: number;
  title: string;
  type: number;
  url: string;
  web_path: string;
  allowed_close: number;
  is_show: number;
}
export interface ISurpriseListData {
  rows: ISurpriseListItem[];
  total: number;
}

export interface IUpdateSurpriseItem {
  _id?: string;
  description: string;
  start_ts: number;
  end_ts: number;
  img_url: string;
  position: number;
  title: string;
  type: number;
  url: string;
  web_path: string;
  allowed_close: number;
  is_show: number;
  updated_at?: number;
}
export interface IAddSurpriseItem {
  description: string;
  start_ts: number;
  end_ts: number;
  img_url: string;
  position: number;
  title: string;
  type: number;
  url: string;
  web_path: string;
  allowed_close: number;
  is_show: number;
  updated_at?: number;
}

export interface IUpdateSurpriseParams {
  data: IUpdateSurpriseItem;
}
