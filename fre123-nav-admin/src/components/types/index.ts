export enum InputType {
  input,
  password,
  select,
  datePicker,
  preInput,
  imgIcon,
  textArea,
  Image,
  Selection,
  Switch,
}

export interface IFormItem {
  type?: InputType // 输入框类型
  field: string
  label?: string
  rules?: any[]
  required?: boolean
  hidden?: boolean

  labelWidth?: string
  placeHolder?: any

  prePlaceHolder?: string
  preWidth?: string
  preField?: string
  preOptions?: Array<IFormSelectOption>

  options?: Array<IFormSelectOption>
  otherOptions?: any
  labelLeftWidth?: string | number
  filterable?: boolean

  slotName?: string //自定义插槽
  labelSlot?: string
}

export interface IFormSelectOption {
  label: string
  value: string | number
}

export interface ITableColumn {
  prop: string
  label: string
  width?: string
  minWidth?: string
  slotName?: string
}

export interface ITableContent {
  title: string
  propList: Array<ITableColumn>
  showSelection?: boolean
}
