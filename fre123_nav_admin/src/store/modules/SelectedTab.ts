import { defineStore } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";

export const SUB_TAB_KEY_WEBSITE_CONFIG = "website";

export interface ISubTab {
  name: Record<string, string>;
}

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
