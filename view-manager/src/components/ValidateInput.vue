<style scoped></style>
<template>
  <div class="validate-input-container pb-3">
    <input
      type="email"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />

    <span v-show="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>

<script lang="ts">
// 传入校验规则
interface RuleProp {
  type: "required" | "email";
  message: string;
}
// 转换成校验数组
export type RulesProp = RuleProp[];
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
  name: "validateInput",
};
</script>

<script setup lang="ts">
import { ref, reactive, useAttrs, onMounted, getCurrentInstance } from "vue";
// 表单验证正则
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

const Instance = getCurrentInstance() as any;

const props = defineProps<{
  rules: RulesProp;
  modelValue: String;
}>();

const attrs = useAttrs();
// 需要校验的数据
const inputRef = reactive({
  // 校验input显示的是父组件传入的值或者为空
  val: props.modelValue || "",
  error: false,
  message: "",
});
// 定义emit派发请求
const emit = defineEmits<{
  (e: "update:modelValue", targetVal: string): void;
}>();
//v-model请求
const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value;
  inputRef.val = targetValue;
  // 派发表单更新请求
  emit("update:modelValue", targetValue);
};
// 输入框校验
const validateInput = () => {
  // 组件要是传进校验类型和消息，则进行校验。没有传入校验类型，返回 true 不进行校验
  if (props.rules) {
    // 检验的数组
    const allPassed = props.rules.every((rule) => {
      // 默认校验通过
      let passed = true;
      inputRef.message = rule.message;
      // 根据校验类型给数据校验，不满足校验结果给passed赋值为false
      switch (rule.type) {
        case "required":
          passed = inputRef.val.trim() !== "";
          break;
        case "email":
          passed = emailReg.test(inputRef.val as any);
          break;
      }

      // 如果校验中不满足校验结果 返回false
      return passed;
    });
    inputRef.error = !allPassed;
    return allPassed;
  }
  return true;
};
// 清空当前input框
const emptyInputRefVal = () => {
  inputRef.val = "";
};

onMounted(() => {
  Instance?.proxy?.$Bus.emit("form-item-created", validateInput);
});

defineExpose({
  validateInput,
  emptyInputRefVal,
});
</script>
