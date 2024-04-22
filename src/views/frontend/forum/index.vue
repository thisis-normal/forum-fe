<template>
  <div
    class="directional pb-2"
    style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
  >
    {{ nameForum }}
  </div>
  <a-list size="large" style="height: 75vh; overflow: auto">
    <a-list-item class="p-0" v-for="item in data" :key="item.id">
      <div class="" style="width: 100%; margin: 12px 0">
        <div
          class="d-flex align-items-center"
          style="width: 100%; justify-content: space-between"
        >
          <div style="display: flex; width: 80%">
            <div>
              <a-avatar size="large">
                <template #icon>
                  <img :src="item.user_avatar" alt="" />
                </template>
              </a-avatar>
            </div>

            <div>
              <div
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 80%;
                  padding-right: 24px;
                  font-size: 16px;
                  display: flex;
                "
              >
                <div
                  class="border px-2"
                  style="border-radius: 5px; margin-right: 12px; height: 30px"
                  :style="{ background: item.prefix_color }"
                >
                  {{ item.prefix_name }}
                </div>
                <router-link
                  :to="{
                    name: 'thread',
                    params: { slug: item.slug + '.' + item.id },
                  }"
                  >{{ item.title }}</router-link
                >
              </div>
              {{ item.user_full_name }}
            </div>
          </div>
          <div style="width: 20%; display: flex; text-align: center">
            <div class="me-3" style="">
              <div>Lượt xem</div>
              {{ item.views }}
            </div>
            <div class="" style="">
              <div>Trả lời</div>
              {{ item.replies }}
            </div>
          </div>
        </div>
      </div>
    </a-list-item>
  </a-list>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  CommentOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import { ref, watch } from "vue";
import { useMenuFront } from "../../../store/useMenuFront.js";
const route = useRoute();
const router = useRouter();
const params = route.params.slug;
const parts = params.split(".");
const result = parts[1];
console.log(result);
const nameForum = ref([]);
useMenuFront().onSelectedKeys(sessionStorage.getItem("idCategory"));

watch(route, () => {
  useMenuFront().onSelectedKeys(sessionStorage.getItem("idCategory"));
});

const data = ref([]);
// Lấy dữ liệu theo danh mục
const getNameForum = async (id) => {
  await axios
    .get(`forum/${id}`)
    .then((response) => {
      nameForum.value = response.data.name;
      data.value = response.data.threads;
      console.log(data);
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
getNameForum(result);

getImg();
</script>
