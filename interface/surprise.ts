export interface ISurpriseItem {
	ads_id?: string
	id?: string
	created_at: number
	update_at: number
	description: string
	start_ts: number
	end_ts: number
	img_url: string
	position: number
	title: string
	type: number
	url: string
	username: string
	web_path: string
	allowed_close: number
	is_show: number
	selected?: boolean
}

export const surpriseWebPathMap = {
	global: '所有页面',
	'/': '首页',
	'/s': '搜索结果页',
	'/d': '详情页',
}

export const positionMap = {
	1: '居中弹窗',
	2: '右下角',
}
