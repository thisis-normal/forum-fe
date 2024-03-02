<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px; background-color: rgba(0, 0, 0, 0); border: none"
    mode="vertical"
    :items="items"
    @click="handleClick"
  />
</template>
<script setup>
import { h, ref, onMounted } from "vue";
import axios from "axios";
import {
  MailOutlined,
  CalendarOutlined,
  TrophyOutlined,
  HomeOutlined,
  NumberOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  ShoppingOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([]);
const getCategory = () => {
  axios
    .get("http://127.0.0.1:5173/category.json")
    .then(function (response) {
      items.value = response.data;
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.log(error);
    });
};
onMounted(() => {
  getCategory();
});
const handleClick = (menuInfo) => {
  if (menuInfo && menuInfo.item.id) {
    const { id } = menuInfo.item;
    const menuItem = items.value.find((item) => item.id === id);
    console.log(menuItem.categoryId);
    if (menuItem && menuItem.categoryId) {
      router.push({
        name: "content",
        params: { id: menuItem.categoryId },
      });
    }
  }
};
</script>
