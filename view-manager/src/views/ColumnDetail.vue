<style scoped></style>
<template>
  <div>{{ route }}</div>
</template>

<script lang="ts">
export default {
  name: "ColumnDetail",
};
</script>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
