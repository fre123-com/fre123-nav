/*
 * @Description:
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-18 17:40:16
 * @LastEditors: 叶剑鑫 yejianxin2022@dingtalk.com
 * @LastEditTime: 2024-08-20 11:26:16
 * 2024-08-18 17:40:16
 */
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
