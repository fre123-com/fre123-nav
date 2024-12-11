<template>
  <el-dialog :title="dialogTitle" width="40%" @close="cancelDialog">
    <el-form
      :model="editFormData"
      :rules="rules"
      ref="editFormRef"
      label-width="100px"
      class="form-style"
    >
      <el-form-item label="广告标题" prop="title">
        <el-input v-model="editFormData.title"></el-input>
      </el-form-item>
      <el-form-item label="广告类型" prop="type">
        <el-select v-model="editFormData.type" @change="handleTypeChange">
          <el-option
            v-for="option in getSurpriseTypeOptions()"
            :key="option.value"
            :label="option.label"
            :value="parseInt(option.value, 10)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="showDescription"
        label="文字描述"
        prop="description"
        style="margin-left: 30px"
      >
        <el-input v-model="editFormData.description"></el-input>
      </el-form-item>
      <el-form-item
        v-if="showImageUrlInput"
        label="图片链接"
        prop="img_url"
        style="margin-left: 30px"
      >
        <el-input
          v-model="editFormData.img_url"
          placeholder="请输入以http://或https://开头的链接"
        ></el-input>
      </el-form-item>
      <!-- 投放页面 -->
      <el-form-item label="投放页面" prop="web_path">
        <el-select
          v-model="editFormData.web_path"
          @change="handleSelectChange('web_path')"
          popper-class="no-border-select"
        >
          <el-option
            v-for="option in getSurpriseWebPathOptions()"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 广告位置 -->
      <el-form-item label="广告位置" prop="position">
        <el-select
          v-model="editFormData.position"
          @change="handleSelectChange('position')"
          popper-class="no-border-select"
        >
          <el-option
            v-for="option in getSurprisePositionOptions()"
            :key="option.value"
            :label="option.label"
            :value="parseInt(option.value, 10)"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 跳转地址 -->
      <el-form-item label="跳转地址" prop="url">
        <el-input
          v-model="editFormData.url"
          placeholder="请输入以http://或https://开头的链接"
        ></el-input>
      </el-form-item>

      <!-- 广告开始时间 -->
      <el-form-item label="开始时间" prop="start_ts">
        <el-date-picker
          v-model="editFormData.start_ts"
          type="datetime"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择日期和时间"
        ></el-date-picker>
      </el-form-item>
      <!-- 广告结束时间 -->
      <el-form-item label="结束时间" prop="end_ts">
        <el-date-picker
          v-model="editFormData.end_ts"
          type="datetime"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择日期和时间"
          :disabledDate="(time: any) => time.getTime() < editFormData.start_ts"
          :default-time="defaultTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="支持关闭" prop="allowed_close">
        <el-switch
          v-model="editFormData.allowed_close"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否显示" prop="is_show">
        <el-switch
          v-model="editFormData.is_show"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancelDialog">取消</el-button>
      <el-button type="primary" @click="handleSaveSurprise">{{
        btnText
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import surpriseApi from '@/api/modules/surprise/index'
import {
  ISurpriseListItem,
  IUpdateSurpriseItem,
} from '@/api/modules/surprise/interface'
import { convertToTimestamp } from '@/utils/formateTime'
import { errorMessage, successMessage } from '@/utils/notifications'
import {
  getSurprisePositionOptions,
  getSurpriseTypeOptions,
  getSurpriseWebPathOptions,
  surpriseRules,
} from '@/views/surprise/index'
import { ElForm } from 'element-plus'
import {
  defineEmits,
  defineProps,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  showAdd: Boolean,
  adItem: Object as PropType<ISurpriseListItem | null>,
  isEditMode: Boolean,
})

// 定义组件的 emits，用于向父组件发送事件
const emit = defineEmits([
  'update:show-add',
  'submit',
  'refresh:data',
  'update:isEditMode',
])
const visible = ref(props.showAdd) // 绑定对话框的显示状态到父组件传递的 showAdd prop
const isEditModeLocal = ref(props.isEditMode) // 判断当前是编辑模式还是添加模式
const editFormData = ref<IUpdateSurpriseItem>(
  reactive({} as IUpdateSurpriseItem)
)
// 初始化表单数据，使用 reactive 来使其响应式
const editFormRef = ref<InstanceType<typeof ElForm> | null>(null) // 绑定表单 DOM 引用，用于直接操作表单元素
const rules = ref(surpriseRules)
// 控制图片链接和描述的显示，根据广告类型显示或隐藏
const showImageUrlInput = ref(false)
const showDescription = ref(false)
// 设置对话框标题，根据编辑模式设置不同标题
const dialogTitle = ref('')
const btnText = ref('')
const saveMessage = ref('')
// 监听 isEditMode prop 的变化
watch(
  () => props.isEditMode,
  (newVal) => {
    // 当 isEditMode 发生变化时，执行以下逻辑
    if (newVal) {
      dialogTitle.value = '编辑广告'
      btnText.value = '保存'
    } else {
      dialogTitle.value = '添加广告'
      btnText.value = '添加'
    }
    saveMessage.value = props.isEditMode ? '应用保存成功' : '应用添加成功'
    emit('update:isEditMode', newVal)
  }
)

// 监听 adItem prop 的变化，更新表单数据
watch(
  () => props.adItem,
  (newVal) => {
    if (newVal) {
      // 使用可选链操作符检查 newVal.data 是否存在
      editFormData.value = reactive({ ...newVal })
      handleTypeChange(newVal.type) // 确保 newVal.data.type 存在
    }
  }
)

// 处理类型变化的函数
const handleTypeChange = (type: number) => {
  // 初始化图片链接和描述的显示状态
  const isImageUrlRequired = type !== 2 // 只有纯文本类型（case 2）不需要图片链接
  const isDescriptionRequired = type !== 1 // 只有纯图类型（case 1）不需要描述

  // 直接更新响应式引用的值，无需中间变量
  showImageUrlInput.value = isImageUrlRequired
  showDescription.value = isDescriptionRequired
}

const resetForm = () => {
  // 确保所有 ISurpriseItem 接口定义的属性都被初始化
  editFormData.value = {
    description: '',
    start_ts: 0,
    end_ts: 0,
    img_url: '',
    position: 2,
    title: '',
    type: 1,
    url: '',
    web_path: '',
    allowed_close: 0,
    is_show: 0,
  }
  if (editFormRef.value) {
    editFormRef.value.resetFields()
    showDescription.value = false
    showImageUrlInput.value = true
  }
}

//提交保存按钮
const handleSaveSurprise = async () => {
  try {
    if (editFormRef.value) {
      // 触发表单校验
      const valid = await editFormRef.value.validate()
      if (!valid) {
        errorMessage('表单验证失败')
        return
      }
      if (editFormData.value.type === 1) {
        editFormData.value.description = ''
      } else if (editFormData.value.type === 2) {
        editFormData.value.img_url = ''
      }
      const submitData = {
        ...editFormData.value,
        _id: editFormData.value._id,
        start_ts: convertToTimestamp(editFormData.value.start_ts),
        end_ts: convertToTimestamp(editFormData.value.end_ts),
        allowed_close: +editFormData.value.allowed_close,
        is_show: +editFormData.value.is_show,
      }
      // 发送更新请求
      if (!props.isEditMode) {
        await surpriseApi.addSurprise(submitData)
      } else {
        await surpriseApi.updateSurprise(submitData)
      }
      emit('refresh:data')
      // 更新成功后的操作
      successMessage(saveMessage.value)
      cancelDialog()
    }
  } catch (error) {
    errorMessage('广告更新失败')
  }
}

const handleSelectChange = (field: string) => {
  if (editFormRef.value) {
    editFormRef.value.validateField(field)
  }
}

// 对话框关闭处理
const cancelDialog = () => {
  visible.value = false // 仅关闭对话框
  emit('update:show-add', false) // 通知父组件更新状态
  resetForm()
}

// 监听属性变化
watch(
  () => props.adItem,
  (newVal) => {
    if (newVal) {
      editFormData.value = reactive({ ...newVal })
    }
  }
)

const defaultTime = new Date(2000, 1, 1, 23, 59, 59)

// 组件挂载后逻辑
onMounted(() => {
  if (isEditModeLocal.value && props.adItem) {
    editFormData.value = reactive({ ...props.adItem })
    dialogTitle.value = '编辑广告'
    btnText.value = '保存'
  } else {
    dialogTitle.value = '添加广告'
    btnText.value = '添加'
  }
  saveMessage.value = props.isEditMode ? '应用保存成功' : '应用添加成功'
  nextTick(() => {
    // 确保表单字段已初始化
    if (editFormRef.value) {
      editFormRef.value.clearValidate()
    }
  })
})
</script>

<style scoped>
.form-style {
  margin-top: 10px;
}
</style>
