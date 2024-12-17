import navApi from '@/api/modules/nav/index'
import { IRequestBody, navDelate, navInsert } from '@/api/modules/nav/interface'
import { ElNotification } from 'element-plus'
//

export interface TabDetail {
  title: string
  ori_url: string
  url: string
  icon: string
  description: string
  suffix: boolean
  is_show: number
}

export interface TabItem {
  tab_name: string
  upper_right_corner: {
    title: string
    url: string
  }
  details: TabDetail[]
}

export interface GroupData {
  _id: string
  group_name: string
  style: number
  style_des: string
  tab_list: TabItem[]
}
//更新的接口
export const updateNav = async (updatedData: IRequestBody) => {
  try {
    await navApi.updateNav(updatedData)
  } catch (error) {
    throw error
  }
}
//新增的接口
export const insertNav = async (insertData: navInsert) => {
  try {
    await navApi.insertNav(insertData)
  } catch (error) {
    throw error
  }
}
//删除的接口
export const deleteNav = async (deleteData: navDelate) => {
  try {
    await navApi.deleteNav(deleteData)
  } catch (error) {
    throw error
  }
}

//校验规则
const urlPattern =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+{}]*)*(\?[;&a-z\d%_.~+=-{}]*)?(\#[-a-z\d_{}]*)?$/i
const validateHttpsLink = (rule: any, value: string) => {
  if (!value) {
    return Promise.resolve()
  }
  if (!/^https:\/\//.test(value)) {
    return Promise.reject('链接地址请以 https:// 开头')
  }
  if (!urlPattern.test(value)) {
    return Promise.reject('链接地址格式不正确')
  }
  return Promise.resolve()
}
export const rules = {
  baseRules: {
    group_name: [
      { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    style_des: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    group_name_url: [
      { required: false, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    tab_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    tab_name_url: [
      { required: false, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    url: [
      { required: true, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    icon: [
      { required: true, message: '请输入图片地址', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  },
  changeRules: {
    group_name: [
      { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    style_des: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    group_name_url: [
      { required: false, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    tab_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    tab_name_url: [
      { required: false, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    url: [
      { required: true, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    icon: [
      { required: true, message: '请输入图片地址', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  },
  newRules: {
    group_name: [
      { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    style_des: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    group_name_url: [
      { required: false, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    tab_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    tab_name_url: [
      { required: false, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    url: [
      { required: true, message: '请输入网站域名', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    icon: [
      { required: true, message: '请输入图片地址', trigger: 'blur' },
      { validator: validateHttpsLink, trigger: 'blur' },
    ],
    description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  },
}
//
export const openSuccessNew = () => {
  ElNotification({
    title: 'Success',
    message: '成功添加',
    type: 'success',
    duration: 1500,
  })
}
export const openSuccessEdit = () => {
  ElNotification({
    title: 'Success',
    message: '成功修改',
    type: 'success',
    duration: 1500,
  })
}
export const openWaring = () => {
  ElNotification({
    message: '请输入正确的格式',
    type: 'warning',
    duration: 1500,
  })
}
export const previewWaring = () => {
  ElNotification({
    message: '没有内容',
    type: 'warning',
    duration: 1500,
  })
}
