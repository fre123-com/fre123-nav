// 总数组的数据结构
export interface ILink {
  status: boolean,
  data: {
      total: number,
      types:Array<{
          name:string,
          created_at: string,
          count:number,
          status:false
      }>
      rows: Array<{
              id:number
              type: string, 
              name: string,
              url: string,
              logo_url: string,
              description: string,
              status: boolean,
              created_at: string,
              updated_at: string
      }>;
      };
      msg: string;
}


