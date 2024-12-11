import surpriseApi from "@/api/modules/surprise/index";
import { SURPRISE_LIST } from "@/api/modules/surprise/urls.const";
import { SURPRISE_STORE_ID } from "@/utils/constant";
import { ISearchParams } from "@/views/surprise/interface";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useQuery } from "vue-query";

// 获取应用列表
export const SurpriseListStore = defineStore(SURPRISE_STORE_ID, () => {
  const surpriseParams = ref<ISearchParams>({
    title: "",
    is_show: -1,
    position: -1,
    web_path: "all",
    start_ts_range: [],
    page: 1,
    page_size: 10,
    type: -1,
  });

  const {
    refetch: refetchSurpriseList,
    isFetching: isSurpriseLoading,
    data: surpriseListData,
  } = useQuery(
    SURPRISE_LIST,
    () => surpriseApi.getSurpriseList(surpriseParams.value),
    {
      enabled: true,
    }
  );

  return {
    surpriseParams,
    refetchSurpriseList,
    isSurpriseLoading,
    surpriseListData,
  };
});

export const useSurpriseListStore = () => storeToRefs(SurpriseListStore());
