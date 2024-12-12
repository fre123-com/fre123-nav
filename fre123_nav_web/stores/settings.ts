const useSettingStore = defineStore(
  "customize_setting",
  () => {
    const curEngine = ref();

    // 切换搜索引擎
    const switchEngine = (val: any) => {
      curEngine.value = val;
    };

    return {
      curEngine,
      switchEngine,
    };
  },
  {
    // 持久化
    persist: true,
  }
);
export default useSettingStore;
