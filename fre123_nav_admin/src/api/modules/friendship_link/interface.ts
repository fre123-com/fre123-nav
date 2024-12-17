//get请求体
export interface IFriendShipParams {
  name?:string
  status?:number
  page?:number,
  page_size?:number
}

export interface IFriendShipItem {  
  data:IFriendShipTypeData;  
  info: string;
  status: number;  
}

export interface IFriendShipTypeData{
  total:number;
  rows:IFriendShipItemData[]
}

export interface IFriendShipItemData {  
  _id: string;  
  created_at?: string;  
  name: string;  
  status?: number;
  index?:number;
  list?: IFriendShipItemRow[];
  count?:number 
}
export interface IFriendShipItemRow {  
  row_id: string;  
  created_at?: string; // 可能是可选的，根据你的数据  
  updated_at?: string;
  url: string;  
  logo_url: string;
  name: string;  
  description: string;  
  status: number;
  type?:string
}
// deleted请求体
export interface IFriendShipDeleteParams {
  ids:string[]
}

export interface IFriendShipInsertParams {
  name:string,
  status:number,
  list?:[]
}

export interface IFriendShipTypeSortParams{
  sorted_names:string[]
}