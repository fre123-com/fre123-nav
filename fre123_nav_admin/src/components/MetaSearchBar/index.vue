<template>
  <div class="meta-search-bar">
    <div class="meta-search-bar-form gap-4">
      <el-form
        v-model="props.modelValue"
        :inline="inline"
        :label-position="labelPosition"
        :model="props.modelValue"
        :label-width="labelWidth"
        :rules="rules"
        ref="ruleFormRef"
      >
        <template v-if="props.labelSlot" #label> </template>
        <el-form-item
          v-for="(item, index) in formItems"
          :key="index"
          :label="item.label"
          :prop="item.field"
          :label-width="item.labelLeftWidth"
          :required="item.required"
        >
          <!-- 输入框或者密码框 -->
          <template
            v-if="
              item.type === InputType.input || item.type === InputType.password
            "
          >
            <el-input
              :type="item.type === InputType.password ? 'password' : 'input'"
              :show-password="item.type === InputType.password"
              v-model="props.modelValue[`${item.field}`]"
              :style="{ width: `${item.labelWidth}` }"
              v-bind="item.otherOptions"
              @keyup.enter="onSearch"
            />
          </template>
          <!-- 文本输入框text -->
          <template v-else-if="item.type === InputType.textArea">
            <el-input
              type="textarea"
              v-model="props.modelValue[`${item.field}`]"
              rows="4"
              :style="{ width: `${item.labelWidth}` }"
              v-bind="item.otherOptions"
            />
          </template>
          <!-- 开关 -->
          <template v-else-if="item.type === InputType.Switch">
            <el-switch
              v-model="props.modelValue[`${item.field}`]"
              v-bind="item.otherOptions"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
          <!-- 图片上传 -->

          <template v-else-if="item.type === InputType.Image">
            <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="cover"
              v-model:img="props.modelValue[`${item.field}`]"
              class="w-[80px] h-[80px]"
            />
          </template>
          <!-- 头像框 -->
          <template v-else-if="item.type === InputType.imgIcon">
            <!-- <MetaImgUpload
              v-model:img="props.modelValue[`${item.field}`]"
              class="w-[80px] h-[80px]"
            /> -->
          </template>
          <!-- 前置输入框 -->
          <template v-else-if="item.type === InputType.preInput">
            <el-input
              v-model="props.modelValue[`${item.field}`]"
              :style="{ width: `${item.labelWidth}` }"
              v-bind="item.otherOptions"
              :placeholder="item.placeHolder"
            >
              <template #prepend>
                <el-select
                  v-model="props.modelValue[`${item.preField}`]"
                  :placeholder="item.prePlaceHolder"
                  :style="{ width: `${item.preWidth}` }"
                >
                  <el-option
                    v-for="{ value, label } in item.preOptions"
                    :key="value"
                    :label="label"
                    :value="value"
                  />
                </el-select>
              </template>
            </el-input>
          </template>
          <!-- 下拉框 -->
          <template v-else-if="item.type === InputType.select">
            <el-select
              v-model="props.modelValue[`${item.field}`]"
              :style="{ width: `${item.labelWidth}` }"
              v-bind="item.otherOptions"
            >
              <el-option
                v-for="(subItem, index) in item.options"
                :key="index"
                :label="subItem.label"
                :value="subItem.value"
              />
            </el-select>
          </template>
          <!-- 时间选择器 -->
          <template v-else-if="item.type === InputType.datePicker">
            <el-date-picker
              v-model="props.modelValue[`${item.field}`]"
              v-bind="item.otherOptions"
            />
          </template>
          <!-- 自定义插槽 -->
          <template v-if="item.slotName">
            <slot :name="item.slotName"></slot>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div class="meta-search-bar-search">
      <slot name="operation"></slot>
      <el-button
        v-if="props.showRefresh"
        :color="META_NORMAL"
        circle
        @click="onRefresh"
      >
        <template #icon>
          <el-icon><refresh /></el-icon>
        </template>
      </el-button>
      <el-button
        v-if="props.showSearch"
        type="primary"
        @click="onSearch"
        class="ml-[10px]"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { META_NORMAL } from "@/config/const";
import { ref } from "vue";
import type { IFormItem } from "../types";
import { InputType } from "../types";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    formItems: Array<IFormItem>;
    showSearch?: boolean;
    inline?: boolean;
    labelPosition?: "left" | "top" | "right";
    labelWidth?: string;
    showRefresh?: boolean;
    rules?: any;
    filterable?: boolean;
    labelSlot?: string;
  }>(),
  {
    modelValue: () => {
      return {};
    },
    formItems: () => {
      return [];
    },
    rules: () => {
      return [];
    },
    labelPosition: "left",
    labelWidth: "100px",
    showSearch: true,
    showRefresh: true,
    inline: true,
    filterable: false,
    labelSlot: "",
  }
);

console.log("modelValue", props.modelValue);

const emit = defineEmits<{
  (e: "onSearch"): void;
  (e: "onRefresh"): void;
}>();

const onSearch = () => {
  emit("onSearch");
};
const onRefresh = () => {
  emit("onRefresh");
};

const ruleFormRef = ref();
const handleValid = async () => {
  let res = false;
  await ruleFormRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      res = true;
    } else {
      res = false;
      console.log("errors", fields);
    }
  });
  return res;
};
const validFun = async () => {
  const result = await handleValid();
  return result;
};
const resetFields = () => {
  return ruleFormRef.value.resetFields();
};
defineExpose({
  validFun,
  resetFields,
});
</script>

<style lang="scss" scoped>
.meta-search-bar {
  display: flex;
  justify-content: space-between;

  &-search {
    display: flex;
  }
}
</style>
