// 1. 具名中间件
export default defineNuxtRouteMiddleware((to, from) => {
	console.log('具名中间件a，影响指定页面：' + to.path)
})

/**
 * 2. 匿名中间件，加到具体页面内，不可复用
 */
// definePageMeta({
//   middleware(to, from) {
//     console.log('匿名中间件，具体页面执行');
//   }
// })

/**
 * 3. 组合中间件，加到页面内,依次执行 auth 和 amid
 */

// definePageMeta({
//  middleware: ['auth','amid'']
// })

/**
 * 4. 中间件可以获取目标路由 to 和来源路由 from，还有两个很常用的工具方法：
 * abortNavigation(error)：跳过，留在 from；
 * navigateTo(route)：指定跳转目标。
 */

// export default defineNuxtRouteMiddleware((to, from) => {
//   if (to.params.id === '1') {
//     return abortNavigation()
//   }
//   return navigateTo('/')
// })
