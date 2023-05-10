<style scoped></style>
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-are" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  onMounted,
  onUnmounted,
  getCurrentInstance,
} from "vue";
// 获取当前vue实例
const Instance = getCurrentInstance();

// 派发表单提交emit
const emit = defineEmits<{
  (e: "form-submit", fn: boolean): void;
  (e: "modelValue", val: string): void;
}>();

type ValidateFunc = () => boolean;
let funArr: ValidateFunc[] = [];

// 发送submit表单提交事件
const submitForm = () => {
  // 调用funArr中的校验回调,every 遇到错误停止循环直接返回
  const result = funArr
    .map((cb) => {
      return cb();
    })
    .every((cb) => cb);

  emit("form-submit", result);
};

// 发送emit事件,获取的 validateInput 回调推入队列中
const callback = (cb: ValidateFunc) => {
  funArr.push(cb);
};

Instance?.proxy?.$Bus.on("form-item-created", callback as any);
onUnmounted(() => {
  Instance?.proxy?.$Bus.off("form-item-created", callback as any);
  funArr = [];
}),
  onMounted(() => {});
</script>
