<template>
  <el-dialog
    @close="props.cleanDialog()"
    :title="props.title"
    width="500"
    align-center
  >
    <template #default>
      <el-form
        :model="props.webOp"
        ref="opForm"
        :rules="props.rules"
        label-width="auto"
      >
        <div class="dialog-box">
          <el-form-item class="dialog-box-son" prop="type" label="类别：">
            <el-select
              v-model="props.webOp.type"
              placeholder="友链类别"
              style="width: 300px"
            >
              <el-option
                v-for="(item, index) in typeDataShow"
                :key="index"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="dialog-box-son" prop="name" label="名字：">
            <el-input
              v-model="props.webOp.name"
              style="width: 300px"
              placeholder="请输入名字"
            ></el-input>
          </el-form-item>
          <el-form-item class="dialog-box-son" prop="url" label="网址：">
            <el-input
              v-model="props.webOp.url"
              style="width: 300px"
              placeholder="请输入友链网址https://..."
            ></el-input>
          </el-form-item>
          <el-form-item class="dialog-box-son" prop="logo_url" label="图标：">
            <el-input
              v-model="props.webOp.logo_url"
              style="width: 300px"
              placeholder="请输入图标网址https://..."
            ></el-input>
          </el-form-item>
          <el-form-item
            class="dialog-box-son"
            prop="description"
            label="描述："
          >
            <el-input
              show-word-limit
              type="textarea"
              maxlength="100"
              v-model="props.webOp.description"
              style="width: 300px"
              placeholder="请输入描述"
            ></el-input>
          </el-form-item>
          <el-form-item class="dialog-box-son" prop="status" label="是否展示：">
            <el-switch
              v-model="props.webOp.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
        </div>
        <el-form-item class="dialog-footer">
          <el-button @click="props.cleanDialog()">关闭</el-button>
          <el-button
            type="primary"
            v-if="props.id === 'webAdd'"
            @click="props.typeFinishDialog('add')"
            >添加</el-button
          >
          <el-button
            type="primary"
            v-if="props.id === 'webEdit'"
            @click="props.typeFinishDialog('edit')"
            >更改</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { typeDataShow, opForm } from '@/views/friendship_link'

const props = defineProps<{
  id: string
  title: String
  iconType: String
  webOp: any
  rules: any
  typeFinishDialog: Function
  cleanDialog: Function
}>()
</script>
