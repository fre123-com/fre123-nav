import { CONFIG_BUSINESS_KEY_SITE, getBusinessConfig } from "./config";

const resourceConfig = ref();
const selectedResourceType = ref("search");

const useResourceStore = defineStore(
  "fre123_search",
  () => {
    const searchOrder = ref<Record<string, string[]>>({});

    const selectedResource = ref();

    const getSearchOrder = () => {
      return searchOrder;
    };

    const setSearchOrder = (resourceType: string, resourceList: string[]) => {
      searchOrder.value[resourceType] = resourceList;
      console.log("search.value", searchOrder.value);
    };

    const setSelectedResourceType = (resourceType: string) => {
      if (resourceType) {
        console.log("selectedResourceType is set to ", resourceType);
        selectedResourceType.value = resourceType;
      }
    };

    const setSelectedResource = (resource: string) => {
      console.log("selectedR esource is set to ", resource);
      selectedResource.value = resource;
    };

    const getResourceConfig = async () => {
      const siteConfig = await getBusinessConfig(CONFIG_BUSINESS_KEY_SITE);
      resourceConfig.value = siteConfig?.find(
        (item) => Object.keys(item)[0] == "header"
      )?.header?.search_engine;
    };

    // 获取资源列表
    const getResourceList = async (
      resourceType: string,
      withOptions: boolean = false,
      isOriginal: boolean = false
    ) => {
      // console.log('resourceConfig.value is', resourceConfig.value)
      let resourceList = resourceConfig.value?.[resourceType].list ?? [];
      // 无效资源类型，返回 404
      if (!resourceList) {
        navigateTo("/404");
      }

      resourceList = resourceList.filter((element) => element.is_show);

      if (!withOptions) {
        return isOriginal
          ? resourceList
          : formatResourceList(resourceType, resourceList);
      }

      return isOriginal
        ? resourceList
        : formatResourceList(resourceType, resourceList);
    };

    // 获取资源类型列表
    const getResourceTypeList = () => {
      let list: any[] = [];
      for (const [k, item] of Object.entries(resourceConfig.value ?? {})) {
        // @ts-ignore
        if (item?.is_show) {
          list.push({
            key: k,
            name: item?.name,
          });
        }
      }

      return list;
    };

    const formatResourceList = (resourceType: string, resourceList: any[]) => {
      if (!resourceList || resourceList.length == 0) {
        console.log("【formatResourceList】 resource list is empty");
        return;
      }
      console.log(
        "【formatResourceList】searchOrder.value is",
        resourceType,
        searchOrder.value[resourceType]
      );

      const resourceConfig = searchOrder.value[resourceType] ?? [];
      // 如果没有自定义设置，按照默认顺序返回
      if (!resourceConfig) {
        return resourceList;
      }

      let resultList: any[] = [];
      resourceConfig.forEach((name) => {
        resourceList.forEach((element, i) => {
          if (name == element.name) {
            resultList.push(element);
            resourceList.splice(i, 1); //使用splice删除元素
          }
        });
      });
      resultList = resultList.concat(resourceList);
      return resultList;
    };

    return {
      searchOrder,
      selectedResourceType,
      selectedResource,
      getResourceConfig,
      getResourceList,
      getResourceTypeList,
      setSearchOrder,
      getSearchOrder,
      setSelectedResourceType,
      setSelectedResource,
    };
  },
  {
    // 持久化
    persist: true,
  }
);

export default useResourceStore;
