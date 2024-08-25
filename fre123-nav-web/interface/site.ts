import type { IGroup } from "./nav";
import type { ISurpriseItem } from "./surprise";

export interface IGlobalConfig {
  site: any[];
  nav: IGroup[];
  surprise: ISurpriseItem[];
  friendship_links: any[];
}
