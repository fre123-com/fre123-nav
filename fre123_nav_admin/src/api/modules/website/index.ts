import request from "@/api";
import { IRequestBody, websiteGet } from "./interface";
import { WEBSITE_GET, WEBSITE_UPDATE } from "./urls.const";

const websiteApi = {
  getWebsite: (params: websiteGet) => request.post<IRequestBody>(WEBSITE_GET, params),
  updateWebsite: (params: IRequestBody) => request.post(WEBSITE_UPDATE, params),
};
export default websiteApi;
