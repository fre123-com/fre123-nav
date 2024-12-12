import piniaPersistConfig from "@/config/piniaPersist";
import { defineStore } from "pinia";
import { MenuState } from "../interface";

// MenuStore
export const MenuStore = defineStore({
  id: "MenuState",
  state: (): MenuState => ({
    // menu collapse
    isCollapse: false,
    // menu List
    menuList: [],
  }),
  getters: {},
  actions: {
    async setCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    async setMenuList(menuList: Menu.MenuOptions[]) {
      this.menuList = menuList;
    },
  },
  persist: piniaPersistConfig("MenuState"),
});
