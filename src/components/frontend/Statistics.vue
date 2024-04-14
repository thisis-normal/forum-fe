<template>
  <div class="latest-posts">
    <div class="row border-bottom">Thống kê diễn đàn</div>
    <div
      class="d-sm-flex mt-2"
      style="justify-content: space-between; color: rgba(0, 0, 0, 0.4)"
    >
      <div>Số thành viên:</div>
      <div>{{ data.user_count }}</div>
    </div>
    <div
      class="d-sm-flex mt-2"
      style="justify-content: space-between; color: rgba(0, 0, 0, 0.4)"
    >
      <div>Số chủ đề:</div>
      <div>{{ data.thread_count }}</div>
    </div>
    <div
      class="d-sm-flex mt-2"
      style="justify-content: space-between; color: rgba(0, 0, 0, 0.4)"
    >
      <div>Số tin nhắn:</div>
      <div>{{ data.post_count }}</div>
    </div>
    <div
      class="d-sm-flex mt-2"
      style="justify-content: space-between; color: rgba(0, 0, 0, 0.4)"
    >
      <div>Thành viên mới nhất:</div>
      <div>{{ data.user_count }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const data = ref([]);
const getStatistics = () => {
  axios.get("home/forum-statistics").then((response) => {
    console.log(response.data);
    data.value = response.data;
  });
};
onMounted(() => {
  getStatistics();
});

// Danh sách các bài viết mới nhất
</script>
