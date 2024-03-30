const useSettingStore = defineStore(
	'customize_setting',
	() => {
		const curEngine = ref({
      "name": "devv",
      "url": "https://devv.ai/zh/search/",
      "icon": "https://likunqi.top/file/00c59c5731eb30d9684f4.png",
      "placeholder": "最懂程序员的新一代 AI 搜索引擎"
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
