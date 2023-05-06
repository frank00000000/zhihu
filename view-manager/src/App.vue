<style scoped></style>
<template>
  <div class="container text-center">
    <global-header :user="globalUser"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
// 引入话题模块
import ColumnList, { ColumnProps } from "@/components/ColumnList.vue";
// 引入 导航栏
import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";

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
  },
  setup() {
    return {
      list: ColumnData,
      globalUser: NavData,
    };
  },
});
</script>
