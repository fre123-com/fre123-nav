/**
 * @name 时间格式化函数
 */
export const formatDate = (timestamp: any) => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * @name 时间戳转日期函数
 */

export const timestampToDate = (timestamp: number) => {
  return new Date(timestamp * 1000) // 因为时间戳通常以秒为单位，需要转换为毫秒
}

/**
 * @name 将 Date 对象转换为时间戳（秒）
 */
export const convertToTimestamp = (dateOrTimestamp: Date | number): number => {
  return dateOrTimestamp instanceof Date
    ? dateOrTimestamp.getTime() / 1000
    : dateOrTimestamp
}
