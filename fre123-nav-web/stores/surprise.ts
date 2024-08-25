/*
 * @Description:
 * @Author: Damnnnnnnn yejianxin1116@gmail.com
 * @Date: 2024-08-18 14:39:46
 * @LastEditors: Damnnnnnnn yejianxin1116@gmail.com
 * @LastEditTime: 2024-08-18 15:15:12
 * 2024-08-18 14:39:46
 */
import { type IStorageSurpriseItem } from '~/interface/surprise'

const useSurpriseStore = defineStore(
	'surprise',
	() => {
		const hiddenSurprise = ref<string[]>([])
		const hiddenSurpriseList = ref<IStorageSurpriseItem[]>([])

		const setHiddenSurprise = (surpriseList: IStorageSurpriseItem[]) => {
			hiddenSurpriseList.value = surpriseList
		}
		return {
			hiddenSurprise,
			hiddenSurpriseList,
			setHiddenSurprise,
		}
	},
	{
		// 持久化
		persist: {
			storage: persistedState.localStorage,
		},
	},
)
export default useSurpriseStore
