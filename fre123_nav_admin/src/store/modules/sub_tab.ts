import piniaPersistConfig from "@/config/piniaPersist";
import { defineStore } from "pinia";

export const SUB_TAB_KEY_RESOURCE = "resource";
export const SUB_TAB_KEY_RESOURCE_HOT = "resource_hot";
export const SUB_TAB_KEY_WEBSITE_CONFIG = "website";
export const SUB_TAB_KEY_WEBSITE_CONFIG_PAGE = "website_page";
export const SUB_TAB_KEY_WEBSITE_CONFIG_PLUGIN = "website_plugin";
export const SUB_TAB_KEY_FRIENDSHIP_LINK = "friendship_link";
export const SUB_TAB_KEY_FEEDBACK = "feedback";

export interface ISubTab {
  name: Record<string, string>;
}
// TabsStore
export const SubTabsStore = defineStore({
  id: "SubTabsState",
  state: (): ISubTab => ({
    name: {},
  }),
  getters: {},
  actions: {
    setName: function (business: string, tabName: string) {
      this.name[business] = tabName;
    },
    getName: function (business: string) {
      return this.name[business];
    },
  },
  persist: piniaPersistConfig("SubTabsState"),
});
