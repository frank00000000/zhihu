<style scoped></style>
<template>
  <div class="container">
    <global-header :user="globalUser"></global-header>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="validateInpRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密 码</label>
        <ValidateInput
          :rules="passwordRules"
          v-model="emailVal"
          type="password"
        ></ValidateInput>
      </div>

      <template v-slot:submit>
        <span class="btn btn-danger">提交</span>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
// 引入话题模块
import ColumnList, { ColumnProps } from "@/components/ColumnList.vue";
// 引入导航栏
import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";
// 引入校验
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
// 引入按钮
import ValidateForm from "./components/ValidateForm.vue";

// 表单验证正则
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// 话题模块数据
const ColumnData: ColumnProps[] = [
  {
    id: "dasknklkl3564123asdas85646",
    name: "test1专栏",
    avatar_url: "https://images.dog.ceo/breeds/mastiff-bull/n02108422_2404.jpg",
    introduction: "我系专栏test1的简介",
  },
  {
    id: "dasknklk5465641fasnlnas46",
    name: "test2专栏",
    avatar_url: "https://images.dog.ceo/breeds/mastiff-bull/n02108422_2404.jpg",
    introduction: "我系专栏test4的简介",
  },
  {
    id: "dasknklkdaosaa4123asdas46",
    name: "test3专栏",
    // avatar_url: "http://xx@qq.com",
    introduction: "我系专栏test3的简介",
  },
  {
    id: "das123sdf2s3a1f23assdas46",
    name: "test4专栏",
    avatar_url: "https://images.dog.ceo/breeds/mastiff-bull/n02108422_2404.jpg",
    introduction: "我系专栏test4的简介",
  },
];
// 导航栏模块数据
const NavData: UserProps = {
  isLogin: true,
  name: "张三",
};
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm,
  },
  setup() {
   
    let validateInpRef = ref<any>("");
    const emailVal = ref("viking");

    // 校验
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "输入密码不能为空" },
    ];

    const onFormSubmit = (result: Function) => {
      console.log("123", result());
      console.log(validateInpRef.value.validateInput());
    };

    return {
      list: ColumnData,
      globalUser: NavData,
      emailRules,
      emailVal,
      passwordRules,
      onFormSubmit,
      validateInpRef,
    };
  },
});
</script>
