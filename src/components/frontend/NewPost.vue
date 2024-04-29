<template>
  <div class="latest-posts">
    <div class="row border-bottom">Bài viết mới nhất</div>
    <div class="mt-3">
      <!-- Hiển thị 3 bài viết mới nhất -->
      <div
        v-for="(post, index) in latestPosts.slice(0, 3)"
        :key="index"
        class="post row mt-2"
      >
        <div class="avt col-2 justify-content-center align-items-center">
          <a-avatar size="large">
            <template #icon> <img :src="post.user_avatar" alt="" /></template>
          </a-avatar>
        </div>
        <div class="content col-10">
          <div style="">
            <div class="user">{{ post.user_full_name }}</div>

            <div class="time" style="font-size: 9px">
              {{ post.post_created_at }}
            </div>
          </div>
          <div class="row">
            <div class="">
              <span style="color: darkblue; margin-right: 12px">
                {{ post.prefixes_name }}
              </span>
              <router-link to="">
                {{ post.thread_name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const latestPosts = ref([]);

const getPost = async () => {
  try {
    const response = await axios.get("home/latest-threads");
    latestPosts.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

onMounted(getPost);
</script>
