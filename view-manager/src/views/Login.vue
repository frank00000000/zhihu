<style scoped></style>
<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailVal"
        placeholder="请输入邮箱地址"
        type="text"
        ref="EmailRef"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label class="form-label">密 码</label>
      <ValidateInput
        :rules="passwordRules"
        v-model="passwordVal"
        placeholder="请输入密码"
        type="password"
        ref="PasswordRef"
      ></ValidateInput>
    </div>

    <template v-slot:submit>
      <span class="btn btn-danger">提交</span>
    </template>
  </validate-form>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
// 引入校验
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
// 引入按钮
import ValidateForm from "@/components/ValidateForm.vue";

// 定义路由
const router = useRouter();

const emailVal = ref("123@test.com");
const passwordVal = ref("123456");

// 校验
const emailRules: RulesProp = [
  { type: "required", message: "电子邮箱地址不能为空" },
  { type: "email", message: "请输入正确的电子邮箱格式" },
];
const passwordRules: RulesProp = [
  { type: "required", message: "输入密码不能为空" },
];

// 获取子组件 validateInpRef 自身属性
let EmailRef = ref<InstanceType<typeof ValidateInput>>();
let PasswordRef = ref<InstanceType<typeof ValidateInput>>();

// 提交btn
const onFormSubmit = (result: boolean) => {
  if (!result) {
    return PasswordRef?.value?.emptyInputRefVal();
  }

  router.push({ name: "column", params: { id: "dasknklkl3564123asdas85646" } });
};
</script>
