import websiteApi from '@/api/modules/website'
import { IRequestBody } from '@/api/modules/website/interface'

export const pendantTypeMap: Record<number, string> = {
  1: '纯图片',
  2: '纯文字',
  3: '图文',
}

export const getPendantTypeOptions = () => {
  let list: any = []
  Object.keys(pendantTypeMap).map((key) => {
    list.push({
      label: pendantTypeMap[key as unknown as number],
      value: key as unknown as number,
    })
  })
  return list
}

export const updateWebsite = async (updatedData: IRequestBody) => {
  try {
    await websiteApi.updateWebsite(updatedData)
  } catch (error) {
    throw error
  }
}

/**
 * @name 弹窗组件校验规则
 */

export const fieldRules = {
  newCategoryName: [
    { required: true, message: '字段名不能为空', trigger: 'blur' },
  ],
  newCategoryFieldName: [
    { required: true, message: '字段名不能为空', trigger: 'blur' },
  ],
  icon: [
    { required: true, message: '图标地址不能为空', trigger: 'blur' },
    { type: 'url', message: '图片地址链接格式不正确', trigger: 'blur' },
  ],
  url: [
    { required: true, message: '链接不能为空', trigger: 'blur' },
    { type: 'url', message: '链接格式不正确', trigger: 'blur' },
  ],
  img: [
    { required: true, message: '图片地址不能为空', trigger: 'blur' },
    { type: 'url', message: '图片地址链接格式不正确', trigger: 'blur' },
  ],
  text: [{ required: true, message: '文本信息不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
  is_show: [{ required: true, message: '是否展示不能为空', trigger: 'change' }],
  placeholder: [{ required: true, message: '暗纹词不能为空', trigger: 'blur' }],
}

/**
 * @name 提示窗
 */

import { ElMessage } from 'element-plus'
import { ref } from 'vue'

/**
 * @name 数据发生更改提示信息
 */

export const showSaveNotice = () => {
  ElMessage({
    message: '数据发生更改，需保存修改方可生效',
    type: 'warning',
  })
}

//CommonEditDialog接口定义
export interface Field {
  label: string
  model: string
}
export interface CommonEditDialogProps {
  CommonEditDialogVisible: boolean
  CommonEditDialogTitle: string
  CommonEditDialogFields: Field[]
  CommonEditDialogFormData: Record<string, any>
  CommonEditDialogRules?: Record<string, any>
}

// CommonAddItemDialog接口定义
export interface AddField {
  label: string
  model: string
  type: string
  props?: Record<string, any>
}

export interface CommonAddItemDialogProps {
  dialogVisible: boolean
  item: Record<string, any>
  title: string
  saveHandler: (evt: MouseEvent) => void
  fields: AddField[]
  formRules: Record<string, any>
}

// 通用对话框的可见性、标题、当前表单数据和保存处理程序
export const dialogVisible = ref(false)
export const dialogTitle = ref('')
export const currentFormData = ref({})
export const currentSaveHandler = ref()
export const currentFormFields = ref()
