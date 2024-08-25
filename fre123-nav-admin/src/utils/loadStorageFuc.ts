/**
 * @name 从本地存储加载广告数据的函数
 */

export const loadAdsFromStorage = (name: any): any => {
  const storedData = localStorage.getItem(name)
  return storedData ? JSON.parse(storedData) : []
}

/**
 * @name 保存广告数据到本地存储的函数
 */
export const saveAdsToStorage = (adsData: any, name: any): void => {
  const serializedData = JSON.stringify(adsData)
  localStorage.setItem(name, serializedData)
}

