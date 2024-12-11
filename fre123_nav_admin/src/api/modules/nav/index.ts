import request from "@/api";
import {IRequestBody, navGet, navDalate, navInsert } from "./interface";
import { NAV_GET, NAV_UPDATE,NAV_DELATE,NAV_INSERT } from "./urls.const";

const navApi = {
  getNav: (params: navGet) => request.post(NAV_GET, params),
  updateNav: (params: IRequestBody) => request.post(NAV_UPDATE, params),
  insertNav: (params: navInsert) => request.post(NAV_INSERT, params),
  deleteNav: (params: navDalate) => request.post(NAV_DELATE, params),
};
export default navApi;