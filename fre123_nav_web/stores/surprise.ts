import { type IStorageSurpriseItem } from "~/interface/surprise";

const useSurpriseStore = defineStore(
  "surprise",
  () => {
    const hiddenSurprise = ref<string[]>([]);
    const hiddenSurpriseList = ref<IStorageSurpriseItem[]>([]);

    const setHiddenSurprise = (surpriseList: IStorageSurpriseItem[]) => {
      hiddenSurpriseList.value = surpriseList;
    };
    return {
      hiddenSurprise,
      hiddenSurpriseList,
      setHiddenSurprise,
    };
  },
  {
    // 持久化
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
export default useSurpriseStore;
