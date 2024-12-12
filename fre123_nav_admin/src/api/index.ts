import { ResultData } from "@/api/interface/common";
import { tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultEnum } from "@/enums/httpEnum";
import router from "@/routers";
import { GlobalStore } from "@/store";
import { getToken } from "@/utils";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";
import { AxiosCanceler } from "./helper/axiosCancel";
import { checkStatus } from "./helper/checkStatus";

const axiosCanceler = new AxiosCanceler();

const baseURL = import.meta.env.VITE_API_BASE_URL as string;
const VERSION = import.meta.env.VITE_VERSION;

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: "api",
  timeout: 1000 * 10,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.headers = {
          Authorization: getToken(),
          "APP-USERNAME": GlobalStore().appUserName,
          Method: config.method?.toUpperCase() ?? "POST",
          "Content-Type": "application/json",
          ...config.headers,
        };
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const globalStore = GlobalStore();
        const { data, config } = response;

        // * 在请求结束后，移除本次请求，并关闭请求 loading
        axiosCanceler.removePending(config);
        tryHideFullScreenLoading();
        // * 登陆失效（code == 599）
        if (
          data.status == ResultEnum.OVERDUE ||
          data.status == ResultEnum.NOT_AUTH
        ) {
          ElMessage.error(data.info);
          router.replace({
            path: "/login",
          });
          globalStore.setToken("");
          globalStore.setAppUserName("");
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）

        // 是否忽略错误
        if (!config.headers?.ignoreError) {
          if (data.status) {
            ElMessage.error(data.data?.err_msg || data.info);
            return Promise.reject(data);
          }
        }
        console.log(`API REQUEST 【${config.url}】,RESPONSE IS `, data);
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        tryHideFullScreenLoading();
        // 请求超时单独判断，因为请求超时没有 response
        if (error.message.indexOf("timeout") !== -1)
          ElMessage.error("请求超时！请您稍后重试");
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace({ path: "/500" });
        return Promise.reject(error);
      }
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
