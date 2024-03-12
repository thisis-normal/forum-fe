<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px; background-color: rgba(0, 0, 0, 0); border: none"
    mode="vertical"
    @click="handleClick"
  >
    <a-menu-item
      v-for="item in items"
      :key="item.id.toString()"
      :item="item"
      style="height: 50px"
    >
      <div
        class="d-flex align-items-center"
        style="font-size: 16px; height: 50px"
      >
        <DynamicIcon
          :name="item.icon_name"
          style="font-size: 24px; margin-right: 12px"
        />
        {{ item.name }}
      </div>
    </a-menu-item>
  </a-menu>
</template>
<script setup>
import { h, ref, onMounted } from "vue";
import DynamicIcon from "../Icon.vue";
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
import { useRouter, useRoute } from "vue-router";
import { useMenuFront } from "../../store/useMenuFront.js";
const router = useRouter();
const route = useRoute();
const items = ref([]);
const store = useMenuFront();
const { selectedKeys, openKeys } = store;

const getCategory = () => {
  axios
    .get("forum-group")
    .then(function (response) {
      items.value = response.data;
      console.log(route.params.id, items.value.length, items.value[0].id);
      if (!route.params.id && items.value.length > 0) {
        router.push(`/${items.value[0].id}`);
      }
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
    console.log(menuItem.id);
    if (menuItem && menuItem.id) {
      router.push({
        name: "content",
        params: { id: menuItem.id },
      });
    }
  }
};
</script>
