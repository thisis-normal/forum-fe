<template>
  <div
    class="directional pb-2"
    style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
  >
    {{ nameForum }}
  </div>
  <a-list size="large" style="height: 75vh; overflow: auto">
    <a-list-item class="p-0" v-for="item in data" :key="item.id">
      <div class="row" style="width: 100%">
        <div
          class="col-12 d-flex align-items-center"
          style="justify-content: space-between"
        >
          <div
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 60%;
              padding-right: 24px;
              font-size: 16px;
              display: flex;
            "
          >
            <div
              class="border px-2"
              style="border-radius: 5px"
              :style="{ background: item.prefix_color }"
            >
              {{ item.prefix_name }}
            </div>
            {{ item.title }}
          </div>

          <div
            class="d-flex flex-column justify-content-center align-items-center"
          ></div>
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
