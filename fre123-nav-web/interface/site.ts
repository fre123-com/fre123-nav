/*
 * @Description:
 * @Author: Damnnnnnnn yejianxin1116@gmail.com
 * @Date: 2024-08-18 01:21:04
 * @LastEditors: Damnnnnnnn yejianxin1116@gmail.com
 * @LastEditTime: 2024-08-23 01:31:30
 * 2024-08-18 01:21:04
 */
import type { IGroup } from './nav'
import type { ISurpriseItem } from './surprise'

export interface IGlobalConfig {
	site: any[]
	nav: IGroup[]
	surprise: ISurpriseItem[]
	friendship_links: any[]
}
