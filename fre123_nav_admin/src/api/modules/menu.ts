// 引入本地json数据
import Menu from "@/assets/json/menu.json";

// * 获取菜单列表
export const getMenuList = () => {
  // 如果想让菜单变为本地数据，引入本地 Menu.json 数据
  return Menu;
};
