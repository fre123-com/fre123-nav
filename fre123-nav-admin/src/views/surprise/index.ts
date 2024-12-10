const surpriseTypeMap: Record<number, string> = {
  1: '纯图',
  2: '纯文字',
}

const surprisePositionMap: Record<number, string> = {
  //1: '居中弹窗',
  2: '右下角',
  // 3: '右上角',
  // 4: '底部贴片',
}

const surpriseWebPathMap: Record<string, string> = {
  global: '所有页面',
  '/': '首页',
  '/s': '搜索结果页',
  '/d': '详情页',
}

export const formatSurpriseType = (type: number) => {
  return surpriseTypeMap[type] ?? '未知'
}

export const formatSurprisePosition = (type: number) => {
  return surprisePositionMap[type] ?? '未知'
}

export const formatSurpriseWebPath = (path: string) => {
  return surpriseWebPathMap[path] ?? path
}

export const getSurpriseTypeOptions = () => {
  let list: any = []
  Object.keys(surpriseTypeMap).map((key) => {
    list.push({
      label: surpriseTypeMap[key as unknown as number],
      value: key as unknown as number,
    })
  })
  return list
}

export const getSurprisePositionOptions = () => {
  let list: any = []
  Object.keys(surprisePositionMap).map((key) => {
    list.push({
      label: surprisePositionMap[key as unknown as number],
      value: key as unknown as number,
    })
  })
  return list
}

export const getSurpriseWebPathOptions = () => {
  let list: any = []
  Object.keys(surpriseWebPathMap).map((key) => {
    list.push({
      label: surpriseWebPathMap[key],
      value: key,
    })
  })
  return list
}

export const exportJsonData = (dataToExport: any, fileName: string) => {
  // 将数据转换为JSON字符串
  const jsonData = JSON.stringify(dataToExport, null, 2)
  // 创建Blob对象
  const blob = new Blob([jsonData], { type: 'application/json' })

  // 创建一个链接元素用于下载
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.download = fileName

  // 将链接添加到DOM并触发点击事件
  document.body.appendChild(link)
  link.click()

  // 然后移除链接，清理DOM
  document.body.removeChild(link)
}

import { ISurpriseListItem } from '@/api/modules/surprise/interface'
// 检查单个搜索条件的辅助函数，适用于字符串搜索
export const matchesSearchCriteria = (
  item: ISurpriseListItem,
  searchValue: string,
  searchProperty: keyof ISurpriseListItem
) => {
  // 如果搜索值为空，则默认匹配
  if (!searchValue.trim()) return true
  // 获取项的属性值并转换为小写进行比较
  const itemValue = String(item[searchProperty]).toLowerCase()
  // 检查是否包含搜索值
  return itemValue.includes(searchValue.toLowerCase())
}

// 检查高级搜索条件的辅助函数，适用于数字或特定字符串的搜索
export const matchesAdvancedCriteria = (
  item: ISurpriseListItem,
  searchValue: number | string | null,
  itemProperty: keyof ISurpriseListItem
) => {
  // 获取项的属性值
  const itemValue = item[itemProperty]
  // 检查 searchValue 是否为 null 或 'all'，表示不过滤该属性
  const isUnspecifiedFilter =
    searchValue === null || searchValue === 'all' || searchValue === -1
  // 检查项的属性值是否与搜索值匹配，或搜索条件是否未指定
  return itemValue === searchValue || isUnspecifiedFilter
}

/**
 * @name 广告规则校验
 */
export const surpriseRules = {
  title: [{ required: true, trigger: 'blur', message: '广告标题不能为空' }],
  description: [
    { required: true, trigger: 'blur', message: '广告描述不能为空' },
  ],
  type: [{ required: true, trigger: 'change', message: '广告类型不能为空' }],
  position: [{ required: true, trigger: 'blur', message: '广告位置不能为空' }],
  img_url: [
    {
      required: true,
      message: '图片链接不能为空',
      trigger: 'blur',
    },
    {
      type: 'url',
      trigger: 'blur',
      message: '请输入有效的图片链接',
    },
  ],
  web_path: [{ required: true, trigger: 'blur', message: '投放页面不能为空' }],
  url: [
    {
      required: true,
      message: '跳转链接不能为空',
      trigger: 'blur',
    },
    {
      type: 'url',
      trigger: 'blur',
      message: '请输入有效的网页链接',
    },
  ],
  // username: [{ required: true, trigger: 'blur', message: '广告商名不能为空' }],
  start_ts: [
    { required: true, trigger: 'blur', message: '广告开始时间不能为空' },
  ],
  end_ts: [
    { required: true, trigger: 'blur', message: '广告结束时间不能为空' },
  ],
}
