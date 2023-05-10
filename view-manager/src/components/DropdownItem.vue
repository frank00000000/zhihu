<style scoped>
.dropdown-option .is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
<template>
  <div>
    <li class="dropdown-option" :class="{ 'is-disabled':disabled }">
      <slot></slot>
    </li>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from "vue";

const props = withDefaults(
  defineProps<{
    disabled: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>
