<template>
  <div
    class="directional pb-2"
    style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
  >
    {{ nameForum.title }}
  </div>

  <a-list size="large" style="height: 75vh; overflow: auto; padding-top: 12px">
    <span
      style="border-radius: 5px; padding: 5px"
      :style="{ background: nameForum.prefix_color }"
      >{{ nameForum.prefix_name }}</span
    >
    {{ nameForum.title }}
    <div
      style="
        width: 100%;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 12px;
        margin-top: 12px;
      "
    >
      <!-- <div><img :src="urlPublic + nameForum." alt="" /></div> -->

      <div class="d-flex">
        <div class="me-2">
          <a-avatar>
            <template #icon>
              <img :src="nameForum.user_avatar" alt="" />
            </template>
          </a-avatar>
        </div>
        <div>
          {{ nameForum.user_full_name }}
        </div>
      </div>
      <div>
        {{ nameForum.content }}
      </div>
    </div>
    <a-list-item class="p-0" v-for="item in post" :key="item.id">
      <div class="" style="width: 100%">
        <div
          style="
            width: 100%;
            padding-right: 24px;
            font-size: 16px;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 12px;
            margin-top: 12px;
          "
        >
          <div>
            <a-avatar size="">
              <template #icon>
                <img :src="item.user_avatar" alt="" />
              </template>
            </a-avatar>
            {{ item.user_full_name }}
          </div>
          <div>
            {{ item.content }}
          </div>
        </div>
      </div>
    </a-list-item>
  </a-list>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import { ref, watch, onMounted } from "vue";
import { useMenuFront } from "../../../store/useMenuFront.js";
const route = useRoute();
const router = useRouter();
const params = route.params.slug;
const parts = params.split(".");
const result = parts[1];

const nameForum = ref([]);
useMenuFront().onSelectedKeys(sessionStorage.getItem("idCategory"));
watch(route, () => {
  useMenuFront().onSelectedKeys(sessionStorage.getItem("idCategory"));
});

const data = ref([]);
const post = ref([]);

// Lấy dữ liệu theo chủ đề
const getNameForum = async (id) => {
  await axios
    .get(`thread/${id}`)
    .then((response) => {
      nameForum.value = response.data;
      data.value = response.data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
const getPost = async (id) => {
  await axios
    .get(`thread/${id}/posts`)
    .then((response) => {
      post.value = response.data.data;

      console.log(post);
    })
    .catch((error) => {
      console.log(error);
    });
};
const getImg = () => {
  axios
    .get("view-image")
    .then((response) => {
      // Xử lý dữ liệu từ API nếu cần
    })
    .catch((error) => {
      console.log(error);
    });
};

const ForumId = result;
watch(
  () => result,
  (newId, oldId) => {
    getNameForum(newId);
  }
);
onMounted(() => {
  getNameForum(result);
  getPost(result);
  getImg();
});
</script>
