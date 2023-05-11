<style scoped></style>
<template>
  <div class="row">
    <div v-for="(col, index) in columnList" :key="col.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="img-fluid rounded-circle d-block"
            :list="col"
            :src="col.avatar_url"
            :alt="col.name"
          />
          <h5 class="card-title">{{ col.name }}</h5>
          <p class="card-text text-left">{{ col.introduction }}</p>
          <router-link
            :to="{ name: 'column', params: { id: col.id } }"
            class="btn btn-outline-primary"
            >进入话题</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 话题模块类型
export interface ColumnProps {
  id: string;
  name: string;
  avatar_url?: string;
  introduction: string;
}
</script>

<script setup lang="ts">
import { defineComponent, PropType, computed } from "vue";

const props = defineProps<{
  list: ColumnProps[];
}>();

// 用户默认头像
const columnList = computed(() => {
  return props.list.map((col) => {
    if (!col.avatar_url) {
      const imgUrl: string = new URL("../assets/moren.jpg", import.meta.url)
        .href;
      col.avatar_url = imgUrl;
    }
    return col;
  });
});
</script>
