export const SURPRISE_TYPE_TEXT = 1;
export const SURPRISE_TYPE_IMAGE = 2;

export interface ISearchParams {
  title: string;
  is_show: number;
  type: number;
  position: number;
  web_path: string;
  start_ts_range: number[];
  page: number;
  page_size: number;
}
