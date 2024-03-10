<template>
  <div
    class="directional pb-2"
    style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
  >
    {{ nameCategory }}<RightOutlined />
  </div>
  <a-list size="large" :data-source="data" style="height: 75vh; overflow: auto">
    <template #renderItem="{ item }">
      <a-list-item class="p-0">
        <div class="row" style="width: 100%">
          <div
            class="col-8 d-flex align-items-center"
            style="justify-content: space-between"
          >
            <div
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 60%;
                padding-right: 24px;
                font-size: 20px;
              "
            >
              <CommentOutlined class="me-3" />
              máy tính siêu mỏng chỉ 1mmdddddddd
            </div>
            <div
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <span> Chủ đề </span>
              {{ item.title }}
            </div>
            <div
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <span> Tin nhắn </span>
              {{ item.title }}
            </div>
          </div>
          <div class="col-4 d-flex align-items-center">
            <a-avatar size="large" class="me-3">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <div
              class="content"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              <div class="title">sssss</div>
              <div class="date">{{ item.date }}</div>
              <div class="art">Nguyễn thành chung</div>
            </div>
          </div>
        </div>

        <!-- Thêm các thuộc tính khác của đối tượng vào đây -->
      </a-list-item>
    </template>
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

const nameCategory = ref([]);
useMenuFront().onSelectedKeys(route.params.id);

watch(route, () => {
  useMenuFront().onSelectedKeys(route.params.id);
});

const data = ref([
  {
    title: "64",
    description: "Description 1",
    date: "2024-01-15",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "64",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "64",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "64",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "64",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "64",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "64",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },
  {
    title: "64",
    description: "Description 2",
    date: "2024-01-16",
    // Thêm các thuộc tính khác của đối tượng vào đây
  },

  // Thêm các đối tượng khác vào đây
]);
const getNameCategory = (id) => {
  axios
    .get(`forum-group/${id}`)
    .then((response) => {
      console.log(response.data);
      nameCategory.value = response.data.name;
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

const categoryId = route.params.id;
watch(
  () => route.params.id,
  (newId, oldId) => {
    getNameCategory(newId);
  }
);
getNameCategory(route.params.id);

getImg();
</script>
