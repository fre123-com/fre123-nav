/*
 * @Description:
 * @Author: Damnnnnnnn yejianxin1116@gmail.com
 * @Date: 2024-08-18 14:40:22
 * @LastEditors: Damnnnnnnn yejianxin1116@gmail.com
 * @LastEditTime: 2024-08-18 14:55:04
 * 2024-08-18 14:40:22
 */
export const API_SURPRISE_LIST = '/v1/site_surprise/web_get'

export enum SurpriseTypeEnum {
	PIC = 1, //纯图
	TEXT = 2, // 纯文字
	PIC_AND_TEXT = 3, // 图文
}
export enum SurprisePositionEnum {
	CENTER = 1, //居中弹窗
	BOTTOM_RIGHT = 2, // 右下角
	TOP_RIGHT = 3, // 右上角
	BOTTOM = 4, // 底部
}

export interface ISurpriseItem {
	description: string
	img_url: string
	position: number
	title: string
	type: number
	url: string
	web_path: string
	start_ts: number
	end_ts: number
	allowed_close: number
	is_show: number
	created_at: number
}

export interface IStorageSurpriseItem {
	title: string
	hidden_time: number
}
