<style scoped></style>
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-are" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue";
export default defineComponent({
  emits: ["form-submit"],
  setup(props, ctx) {
    const submitForm = () => {
      ctx.emit("form-submit", () => {
        return "hello";
      });
    };

    onMounted(() => {
    });

    return {
      submitForm,
    };
  },
});
</script>
