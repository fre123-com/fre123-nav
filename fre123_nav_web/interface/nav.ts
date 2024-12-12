export const API_GET_NAV = '/v1/nav/get'
export interface ITabDetails {
	title: string
	ori_url?: string
	url: string
	icon: string
	description: string
	suffix?: boolean
	is_show?: boolean
}

export interface IUpperRightCorner {
	title: string
	url: string
}

export interface ITab {
	tab_name: string
	icon?: string
	bg_color?: string
	details: ITabDetails[]
	upper_right_corner?: IUpperRightCorner
}

export interface IGroup {
	group_name: string
	style: number
	// style_desc?: string
	style_des?: string
	left?: number
	width?: number
	tab_list: ITab[]
}
