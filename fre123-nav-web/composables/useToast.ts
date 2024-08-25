import { useToast, PluginOptions } from 'vue-toastification'

const { info, error, success, warning } = useToast()
export const showMessage = {
	info: (content: string, options?: PluginOptions) => {
		info(content, options)
	},
	error: (content: string, options?: PluginOptions) => {
		error(content, options)
	},
	success: (content: string, options?: PluginOptions) => {
		return success(content, options)
	},
	warning: (content: string, options?: PluginOptions) => {
		warning(content, options)
	},
}
