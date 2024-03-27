<template>
  <div class="latest-posts">
    <div class="row border-bottom">Bài viết mới nhất</div>
    <div class="row mt-3">
      <!-- Hiển thị danh sách các bài viết mới nhất -->
      <div
        v-for="(post, index) in latestPosts"
        :key="index"
        class="post row mt-2"
      >
        <div class="avt col-2 justify-content-center align-items-center">
          <a-avatar size="large">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </div>
        <div class="content col-10 row">
          <div class="row">
            <div class="user col-2">{{ post.user }}</div>
            <div class="user col-1">-</div>
            <div class="time col-7">{{ post.time }}</div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ post.title }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ post.category }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const urlApi = import.meta.env.VITE_URL_API;
const urlTest = import.meta.env.VITE_URL_TEST;
import { UserOutlined } from "@ant-design/icons-vue";
// Danh sách các bài viết mới nhất
const latestPosts = ref([
  {
    user: "NTC",
    time: "06/04/2024",
    title: "Bài viết 1",
    category: "Máy tính",
  },
  {
    user: "NTC",
    time: "06/04/2024",
    title: "Bài viết 2",
    category: "Máy tính",
  },
  {
    user: "NTC",
    time: "06/04/2024",
    title: "Bài viết 3",
    category: "Máy tính",
  },
]);
</script>
