// 判断是否移动端
export const isMobile = () => {
	let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	)
	return flag
}
