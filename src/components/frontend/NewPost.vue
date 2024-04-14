<template>
  <div class="latest-posts">
    <div class="row border-bottom">Bài viết mới nhất</div>
    <div class="row mt-3">
      <!-- Hiển thị 3 bài viết mới nhất -->
      <div
        v-for="(post, index) in latestPosts.slice(0, 3)"
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
            <div class="user col-7">{{ post.user_full_name }}</div>
            <div class="user col-1">-</div>
            <div class="time col-2">{{ post.post_created_at }}</div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ post.thread_name }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              {{ post.prefixes_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { UserOutlined } from "@ant-design/icons-vue";
import axios from "axios";
// Danh sách các bài viết mới nhất
const latestPosts = ref([]);
const getPost = () => {
  axios.get("home/latest-threads").then((response) => {
    latestPosts.value = response.data;
    console.log(latestPosts.value);
  });
};
onMounted(() => {
  getPost();
});
</script>
