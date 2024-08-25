/*
 * @Description:
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-17 11:50:55
 * @LastEditors: FantasyBee FantasyBee07@outlook.com
 * @LastEditTime: 2024-08-21 15:48:12
 * 2024-08-17 11:50:55
 */
import websiteApi from "@/api/modules/website";
import { websiteGet } from "@/api/modules/website/interface";
import { WEBSITE_GET } from "@/api/modules/website/urls.const";
import { WEBSITE_STORE_ID } from "@/utils/constant";
import { defineStore, storeToRefs } from "pinia";
import { reactive } from "vue";
import { useQuery } from "vue-query";

export const WebsiteStore = defineStore(WEBSITE_STORE_ID, () => {
  const websiteParams = reactive<websiteGet>({
    type: "",
  });
  const { refetch: refetchWebsite, data: websiteData } = useQuery(
    WEBSITE_GET,
    () => websiteApi.getWebsite(websiteParams),
    {
      enabled: false,
    }
  );

  const getWebsiteConfig = async <T>(type: string) => {
    websiteParams.type = type;
    await refetchWebsite.value();
    return JSON.parse(JSON.stringify(websiteData.value?.data)) as T;
  };

  return {
    websiteParams,
    refetchWebsite,
    websiteData,
    getWebsiteConfig,
  };
});

export const websiteStore = () => storeToRefs(WebsiteStore());
