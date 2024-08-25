export interface NObject {
  [key: string]: string | number | undefined | null | void | Object;
}

// * 请求响应参数(不包含data)
export interface Result {
  status: string;
  info: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  rows: any;
  data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
  rows: T[];
  total: number;
}

export interface ResPageRow<T> {
  rows: T[];
  total: number;
}

export interface ResPageResult<T> {
  result: T[];
  total: number;
}

// * 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

export interface ResLogin {
  access_token: string;
}

// * 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [propName: string]: any;
  }
}

// * 用户管理模块
export namespace User {
  export interface ReqGetUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: string;
    age: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
}

// * 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}
