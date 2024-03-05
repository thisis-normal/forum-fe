<template>
  <a-list size="large" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <div class="row" style="width: 100%">
          <div
            class="col-7 d-flex align-items-center"
            style="justify-content: space-between"
          >
            <CommentOutlined />
            {{ item.title }}
            {{ item.description }}
            {{ item.date }}
          </div>
          <div class="col-5">ss</div>
        </div>

        <!-- Thêm các thuộc tính khác của đối tượng vào đây -->
      </a-list-item>
    </template>
    <template #header>
      <div>Header</div>
    </template>
  </a-list>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { CommentOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import { ref, watch } from "vue";

const route = useRoute();
const router = useRouter();
const urlApi = import.meta.env.VITE_URL_API;

const data = ref([
  {
    title: "Title 1",
    description: "Description 1",
    date: "2024-01-15",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "Title 2",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  // Thêm các đối tượng khác vào đây
]);

const getImg = () => {
  axios
    .get(urlApi + "view-image")
    .then((response) => {
      // Xử lý dữ liệu từ API nếu cần
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCategory = (categoryId) => {
  axios
    .get(urlApi + "image")
    .then((response) => {
      // Xử lý dữ liệu từ API nếu cần
    })
    .catch((error) => {
      console.log(error);
    });
};

const categoryId = route.params.id;
watch(
  () => route.params.id,
  (newId, oldId) => {
    getCategory(newId);
  }
);

getCategory(categoryId);
getImg();
</script>
