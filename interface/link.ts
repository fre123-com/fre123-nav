export interface IFriendShipItemData {  
  type_id: string;  
  created_at: string;  
  name: string;  
  status: boolean;  
  rows: IFriendShipItemRow[];
  count:number 
}
export interface IFriendShipItemRow {  
  row_id: string;  
  created_at?: string; // 可能是可选的，根据你的数据  
  updated_at?: string;  
  order: number;  
  url: string;  
  logo_url: string;
  name: string;  
  description: string;  
  status: boolean;
  type?:string
}
