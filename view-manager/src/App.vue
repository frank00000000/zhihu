<style scoped></style>
<template>
  <div class="container">
    <global-header :user="NavData"></global-header>
    <router-view></router-view>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <samll>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">@2023 书评</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多内容</li>
      </ul>
    </samll>
  </footer>
</template>
<script setup lang="ts">
import { ref, reactive, defineComponent } from "vue";

// 引入导航栏
import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";

// 导航栏模块数据
const NavData: UserProps = {
  isLogin: false,
  name: "张三",
};
</script>
