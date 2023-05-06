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
          <a href="#" class="btn btn-outline-primary">进入话题</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
// 话题模块类型
export interface ColumnProps {
  id: string;
  name: string;
  avatar_url?: string;
  introduction: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
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

    return { columnList };
  },
});
</script>
