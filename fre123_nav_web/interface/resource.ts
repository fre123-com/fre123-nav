export interface IResourceType {
	name: string
	key?: string
	path: string
	is_show: boolean
	allow_combine: boolean
	is_search: boolean
	column?: number
	list: IResource[]
}

export type IOptions = Record<string, IOptionItem>

export interface IResource {
	name: string
	title?: string
	path: string
	ori_url: string
	url: string
	icon: string
	placeholder?: string
	is_show: boolean
	login_required?: boolean
	allow_cache?: boolean
	options?: IOptions
}

export interface IOptionItem {
	type: string
	left: number
	top: number
	width: number
}
