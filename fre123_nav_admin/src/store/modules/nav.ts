import navApi from "@/api/modules/nav/index";
import { navGet } from "@/api/modules/nav/interface";
import { NAV_GET } from "@/api/modules/nav/urls.const";
import { NAV_STORE_ID } from "@/utils/constant";
import { defineStore, storeToRefs } from "pinia";
import { useQuery } from "vue-query";
import { reactive } from "vue";



export const NavStore = defineStore(NAV_STORE_ID, () => {
  const navParams = reactive<navGet>({
    group_name: "",
    status : -1,
    page: 1,
    page_size: 100,
  });
  const { refetch: refetchNav, data: navData } = useQuery(
    NAV_GET,
    () => navApi.getNav(navParams),
    {
      enabled: true,
    }
  );
  return {
    navParams,
    refetchNav,
    navData,
  };
});

export const navStore = () => storeToRefs(NavStore());