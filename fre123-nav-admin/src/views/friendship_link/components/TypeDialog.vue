<!--
 * @Description: 
 * @Author: 叶剑鑫 yejianxin2022@dingtalk.com
 * @Date: 2024-08-14 21:59:58
 * @LastEditors: 叶剑鑫 yejianxin2022@dingtalk.com
 * @LastEditTime: 2024-08-18 18:09:19
 * 2024-08-14 21:59:58
-->
<template>
    <el-dialog @close="props.cleanDialog();" title="操作弹窗" width="500" align-center>
        <template #header>
            <h2 style="display: flex; align-items: center;"><el-icon size="large" color="#409EFF"
                    style="margin-right: 10px;">
                    <component :is="props.iconType"></component>
                </el-icon>{{ props.title }}</h2>
        </template>
        <template #default>
            <el-form :model="props.typeOp" ref="opForm" :rules="props.rules">
                <div class="dialog-box">
                    <el-form-item class="dialog-box-son" prop="name" label="类别：">
                        <el-input v-model="props.typeOp.name" style="width: 300px" placeholder="请输入类别名字..."></el-input>
                    </el-form-item>
                    <el-form-item class="dialog-box-son" prop="status" label="是否展示：">
                        <el-switch v-model="props.typeOp.status"  :active-value="1" :inactive-value="0" ></el-switch>
                    </el-form-item>
                </div>
                <el-form-item class="dialog-footer">
                    <el-button @click="props.cleanDialog()">关闭</el-button>
                    <el-button type="primary" v-if="props.id === 'typeAdd'"
                        @click="props.kindFinishDialog('add')">添加</el-button>
                    <el-button type="primary" v-if="props.id === 'typeEdit'"
                        @click="props.kindFinishDialog('edit')">更改</el-button>
                </el-form-item>
            </el-form>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { opForm } from "@/views/friendship_link";

const props = defineProps<{
  id: string;
  title: String;
  iconType: String;
  rules: any;
  typeOp: any;
  kindFinishDialog: Function;
  cleanDialog: Function;
}>();
</script>
