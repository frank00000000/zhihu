<style scoped></style>
<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click="toggleOpen"
    >
      {{ title }}
    </a>
    <ul
      class="dropdown-menu"
      :style="{
        display: 'block',
        backgroundColor: 'white',
        '--bs-dropdown-link-hover-bg': '#0d6efd',
        '--bs-dropdown-link-color': 'black',
      }"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import useClickOutside from "../hooks/useClickOutside";
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  setup() {
    // 控制下拉框显示与隐藏
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    // 点击 toggleOpen 按钮后，显示与隐藏取反
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    // hook方法 判断注册 DOM 点击元素是否为列表子元素
    const isOut = useClickOutside(dropdownRef);
    watch(isOut, () => {
      if (isOpen.value && isOut.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      toggleOpen,
      dropdownRef,
    };
  },
});
</script>
