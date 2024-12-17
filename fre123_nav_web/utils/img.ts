// import defaultThumbnail from '@/assets/img/error_pic.png'

export const UseSampleImage = (event: any) => {
	const randomNum = Math.floor(Math.random() * 10 + 1)
	const filePath = '../assets/img/sample/' + randomNum + '.jpeg'
	event.target.src = new URL(filePath, import.meta.url).href
}

export const GetDefaultAIImage = () => {
	const randomNum = Math.floor(Math.random() * 10 + 1)
	return '/img/sample/' + randomNum + '.jpeg'
}

export const UseDefaultImage = (event: any) => {
	event.target.src = ''
}

export const GetProxyImg = (img: string, proxy: boolean = true) => {
	return proxy ? 'https://images.weserv.nl/?url=' + img : img
}

export const getBingWallpaper = async () => {
	const { data: imgUrl } = await useAsyncData('bing-wallpaper', async () => {
		const res = await fetch('https://www.todaybing.com/api/today/cn?formate=json')
		const { data } = await res.json()
		return data.image
	})
	return imgUrl.value
}
