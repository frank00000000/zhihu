<style scoped></style>
<template>
  <div>
    <!-- 导航栏 -->
    <nav class="navbar bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <!-- 登录注册 -->
        <a class="navbar-brand" href="#">LXH zhifu</a>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
          <li class="list-inline-item">
            <a href="#" class="btn btn-outline-light my-2">登录</a>
            <a href="#" class="btn btn-outline-light my-2">注册</a>
          </li>
        </ul>
        <ul v-else class="list-inline mb-0">
          <li class="list-inline-item">
            <dropdown :title="`你好! ${user.name}`"></dropdown>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<!--  导航栏组件 -->
<script lang="ts">
import { ref, reactive, defineComponent, PropType } from "vue";
import Dropdown from "./Dropdown.vue";

// 导航栏类型
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  components: { Dropdown },
});
</script>
