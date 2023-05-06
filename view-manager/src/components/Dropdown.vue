<style scoped></style>
<template>
  <div class="dropdown">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click="toggleOpen"
    >
      {{ title }}
    </a>

    <ul class="dropdown-menu" style="display: block" v-if="isOpen">
      <li><a href="#" class="dropdown-item">新建文章</a></li>
      <li><a href="#" class="dropdown-item">编辑资料</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen,
      toggleOpen,
    };
  },
});
</script>
