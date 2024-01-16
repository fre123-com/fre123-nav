import webConfig from '../config/website.json'

export const CONFIG_KEY_BASE = 'base'
export const CONFIG_KEY_SEO = 'seo'
export const CONFIG_KEY_HERDER = 'header'

export const CONFIG_KEY_PENDANT = 'pendant'
export const CONFIG_KEY_FOOTER = 'footer'

const KeyMap = {
	CONFIG_KEY_BASE: 'base',
	CONFIG_KEY_SEO: 'seo',
	CONFIG_KEY_HERDER: 'header',
	CONFIG_KEY_PENDANT: 'pendant',
	CONFIG_KEY_FOOTER: 'footer',
}

// 获取配置信息
export const getConfigItem = (key: string = '') => {
	if (!key) {
		return webConfig
	}

	if (!Object.values(KeyMap).includes(key)) {
		return createError('无法获取配置信息')
	}

	return webConfig[key]
}
