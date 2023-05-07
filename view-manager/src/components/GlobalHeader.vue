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
            <dropdown :title="`你好! ${user.name}`">
              <DropdownItem>
                <a href="#" class="dropdown-item">新建文章</a>
              </DropdownItem>
              <dropdown-item disabled>
                <a href="#" class="dropdown-item">编辑资料</a>
              </dropdown-item>
              <DropdownItem>
                <a href="#" class="dropdown-item">退出登录</a>
              </DropdownItem>
            </dropdown>
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
import DropdownItem from "./DropdownItem.vue";
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
  components: { Dropdown, DropdownItem },
});
</script>
