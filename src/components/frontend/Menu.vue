<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px; background-color: rgba(0, 0, 0, 0); border: none"
    mode="vertical"
    @click="handleClick"
  >
    <a-menu-item v-for="item in items" :key="item.id" :item="item">
      <MailOutlined class="mx-3" style="font-size: 20px" />

      {{ item.name }}
    </a-menu-item>
  </a-menu>
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
const urlApi = import.meta.env.VITE_URL_API;
const urlTest = import.meta.env.VITE_URL_TEST;
const getCategory = () => {
  axios
    .get(urlApi + "image")
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
  console.log(menuInfo);
  if (menuInfo && menuInfo.item.item.id) {
    const { id } = menuInfo.item.item;
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
