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

/**
 * 设置24小时后的时间
 * @param adData - 广告数据对象，包含广告的详细信息和状态
 */
export const close24h = (adData: ISurpriseItem | null) => {
	if (!adData) return
	const ad = adData
	const closeTime = new Date()
	closeTime.setHours(closeTime.getHours() + 24) // 设置24小时后的时间
	localStorage.setItem(`${ad.ads_id}_closeTime`, closeTime.toISOString())
}
