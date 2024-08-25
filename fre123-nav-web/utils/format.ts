import dayjs from 'dayjs'

// timestamp 单位为 s
export const FormatDate = (timestamp: number, format: string = 'YYYY-MM-DD hh:mm:ss') => {
	return dayjs(timestamp * 1000).format(format)
}

export const CalcRelativeDate = (timestamp: number) => {
	const relativeDate = Date.now() - timestamp * 1000

	if (timestamp === 0) {
		return '0000-00-00 00:00'
	}

	if (relativeDate > 0 && relativeDate <= 1000 * 60) {
		return '刚刚'
	}

	if (relativeDate > 60 * 1000 && relativeDate < 1000 * 60 * 60) {
		return `${~~(relativeDate / 1000 / 60)}分钟前`
	}
	if (relativeDate > 60 * 1000 * 60 && relativeDate < 1000 * 60 * 60 * 24) {
		return `${~~(relativeDate / 1000 / 60 / 60)}小时前`
	}
	if (relativeDate > 60 * 1000 * 60 * 24 && relativeDate < 1000 * 60 * 60 * 24 * 2) {
		return `昨天`
	}

	const date = new Date(timestamp * 1000).toLocaleDateString().split('/')

	return `${date[2]}/${date[0]}/${date[1]}`
}
