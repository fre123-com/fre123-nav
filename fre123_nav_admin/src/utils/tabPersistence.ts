import { ref } from "vue";
import { TabsPaneContext } from "element-plus";
import { SubTabsStore } from "@/store/modules/SelectedTab";

export const useTabPersistence = (businessKey: string, defaultTab: string) => {
  const subTabStore = SubTabsStore();
  const activeTabName = ref(subTabStore.getName(businessKey) || defaultTab);

  const switchTab = async (pane: TabsPaneContext, ev: Event) => {
    const paneName = pane.paneName as string;
    if (paneName === activeTabName.value) {
      return;
    }
    activeTabName.value = paneName;
    subTabStore.setName(businessKey, activeTabName.value);
  };

  return {
    activeTabName,
    switchTab,
  };
};
