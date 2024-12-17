import request from "@/api";
import {
  IAddSurpriseItem,
  ISurpriseListData,
  ISurpriseListParams,
  IUpdateSurpriseItem,
} from "./interface";
import {
  SURPRISE_DEL,
  SURPRISE_INSERT,
  SURPRISE_LIST,
  SURPRISE_UPDATE,
} from "./urls.const";
const surpriseApi = {
  getSurpriseList: (params: ISurpriseListParams) =>
    request.post<ISurpriseListData>(SURPRISE_LIST, params),
  delSurprise: (params: { ids: string[] }) =>
    request.post(SURPRISE_DEL, params),
  updateSurprise: (params: IUpdateSurpriseItem) =>
    request.post(SURPRISE_UPDATE, params),
  addSurprise: (params: IAddSurpriseItem) =>
    request.post(SURPRISE_INSERT, params),
};

export default surpriseApi;
