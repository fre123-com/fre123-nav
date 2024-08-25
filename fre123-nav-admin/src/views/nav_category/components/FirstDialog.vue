<template>
  <el-dialog :model-value="visible"  @close="handleClose">
    <template #header>
      {{ dialogHeader }}
    </template>
    <el-form
      :model="formData" 
      :rules="rules.baseRules"       
      label-position="right"  
      class="demo-form-inline"  
      label-width="auto"
      ref="newCategoryForm"
      >
      <el-form-item label="类别名称" prop="group_name" class="form-top">
        <el-input v-model="formData.group_name" clearable />
      </el-form-item>
      <el-form-item label="风格类型" prop="style_des">
        <el-select
        v-model="formData.style_des"
        placeholder="选择风格"
        width="200px"
        >
        <el-option label="标准风格" value="标准风格" />
        </el-select>
      </el-form-item>

      <el-form-item label="跳转链接" prop="group_name_url" label-position="right" >
        <el-input v-model="formData.group_name_url" clearable />
      </el-form-item>

      <el-form-item class="btn-group">
      <el-button v-if='editMode' type="primary" @click="onSubmit(newCategoryForm)" style="margin-left: 80%;">确认修改</el-button>
      <el-button v-else type="primary" @click="onSubmitNew(newCategoryForm)" style="margin-left: 80%;">确认新建</el-button>
      </el-form-item>
    </el-form>  
  </el-dialog>
</template>
 <script setup lang="ts">
 import { ref, defineProps } from 'vue';
 import { rules} from  '@/views/nav_category/index';
 const newCategoryForm = ref()
 interface FormData {
 _id: string;
 group_name: string;
 style_des: string;
 group_name_url: string;
}

const props = withDefaults(
 defineProps<{
 visible?: boolean;
 dialogHeader?: string;
 formData: FormData;
 editMode?: boolean;
 }>(),
 {
   visible: false,
 },
)

const emit = defineEmits<{
 (e: 'onSubmit', value: any): void
 (e: 'onSubmitNew', value: any): void
}>()

const resetForm = () => {
  if (newCategoryForm.value) {
    newCategoryForm.value.resetFields();
  }
}

const handleClose = () => {
  resetForm();
}

const onSubmit = (value: any) => {
 emit('onSubmit', value)
}

const onSubmitNew = (value: any) => {
 emit('onSubmitNew', value)
}
 
 
 </script>
 
 <style scoped>
.form-top{
 margin-top: 20px;
}
.demo-form-inline .el-form-item{
 margin-left: 15px;
}
.demo-form-inline .el-input {
 --el-input-width: 520px;
}
.demo-form-inline .el-select {
 --el-select-width: 520px;
}
 </style>
