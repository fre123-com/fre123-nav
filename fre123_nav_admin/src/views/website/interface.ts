export interface RefreshAbleComponent {
  refresh: () => void;
}

export enum TabType {
  Base = "base",
  Seo = "seo",
  Header = "header",
  HeaderAdvert = "headerAdvert",
  Pendant = "pendant",
  Footer = "footer",
}