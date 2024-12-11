// 文件名带global.ts后缀的为全局中间件
export default defineNuxtRouteMiddleware((to, from) => {
	console.log('全局中间件c，影响所有页面')
})
