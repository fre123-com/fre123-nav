const useSettingStore = defineStore(
	'customize_setting',
	() => {
		const curEngine = ref({
			name: '百度',
			url: 'https://www.baidu.com/s?wd=',
			icon: 'https://img.fre123.com/i/2023/11/26/656303de24efc.png',
			placeholder: '百度一下，你就知道',
		})

		// 切换搜索引擎
		const switchEngine = (val: any) => {
			curEngine.value = val
		}

		return {
			curEngine,
			switchEngine,
		}
	},
	{
		// 持久化
		persist: true,
	},
)
export default useSettingStore
