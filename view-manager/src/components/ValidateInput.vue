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

    <span v-if="inputRef.error" class="invalid-feedback"
      >{{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { ref, reactive,defineProps, defineComponent, PropType } from "vue";
// 表单验证正则
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
interface RuleProp {
  type: "required" | "email";
  message: String;
}
export type RulesProp = RuleProp[];

export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
  },
  $attrs: {
    type: Object as any,
  },
  // 父组件传过来的属性不会放到跟组件上
  inheritAttrs: false,
  setup(props, context) {
    context.attrs;

    // 需要校验的数据
    const inputRef = reactive({
      // 校验input显示的是父组件传入的值或者为空
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    //v-model请求
    const updateValue = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      // 派发表单更新请求
      context.emit("update:modelValue", targetValue);
    };
    // 输入框校验
    const validateInput = () => {
      // 组件要是传进校验类型和消息，则进行校验。没有传入校验类型，返回 true 不进行校验
      if (props.rules) {
        // 检验的数组
        const allPassed = props.rules.every((rule) => {
          // 给定值通过，没有校验也通过
          let passed = true;

          if (!rule.message) {
            return console.error("请输入校验错误信息");
          }

          // 根据校验类型给数据校验，不满足校验结果给passed赋值为false
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
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
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>
