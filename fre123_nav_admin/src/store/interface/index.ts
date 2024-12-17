/* themeConfigProp */
export interface ThemeConfigProp {
  breadcrumb: boolean;
  tabs: boolean;
  footer: boolean;
}

/* GlobalState */
export interface GlobalState {
  token: string;
  userInfo: any;
  appUserName: string;
  themeConfig: ThemeConfigProp;
}

/* MenuState */
export interface MenuState {
  isCollapse: boolean;
  menuList: Menu.MenuOptions[];
}

/* TabsState */
export interface TabsState {
  tabsMenuValue: string;
  tabsMenuList: Menu.MenuOptions[];
}

/* AuthState */
export interface AuthState {
  authButtons: {
    [propName: string]: any;
  };
  authRouter: string[];
}
