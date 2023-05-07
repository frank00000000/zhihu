<style scoped></style>
<template>
  <div class="container">
    <global-header :user="globalUser"></global-header>
    <form>
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div id="emailHelp" class="form-text" v-if="emailRef.error">
          {{ emailRef.message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
// 引入话题模块
import ColumnList, { ColumnProps } from "@/components/ColumnList.vue";
// 引入导航栏
import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";
// 引入校验
import validateInput, { RulesProp } from "@/components/ValidateInput.vue";

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
    validateInput,
  },
  setup() {
    // 校验
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    // 表单
    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    });
    // 表单验证
    const validateEmail = () => {
      // 当前邮箱为空
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "邮箱输入不能为空";

        // 当前的正则不是邮箱格式
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "邮箱格式错误";
      } else {
        emailRef.error = false;
      }
    };

    return {
      list: ColumnData,
      globalUser: NavData,
      emailRef,
      validateEmail,
      emailRules
    };
  },
});
</script>
