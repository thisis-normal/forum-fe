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
import { h, ref } from "vue";
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
const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: "1",
    icon: () => h(HomeOutlined),
    label: "Trang chủ",
    title: "Trang chủ",
  },
  {
    key: "2",
    icon: () => h(TrophyOutlined),
    label: "Học tập và sự nghiệp",
    title: "Học tập và sự nghiệp",
  },
  {
    key: "3",
    icon: () => h(NumberOutlined),
    label: "Sản phẩm công nghệ",
    title: "Sản phẩm công nghệ",
  },
  ,
  {
    key: "4",
    icon: () => h(AppstoreOutlined),
    label: "Phần mềm và game",
    title: "Phần mềm và game",
  },
  {
    key: "5",
    icon: () => h(LaptopOutlined),
    label: "Máy tính",
    title: "Máy tính",
  },
  ,
  {
    key: "6",
    icon: () => h(GiftOutlined),
    label: "Khu vui chơi giải trí",
    title: "Khu vui chơi giải trí",
  },
  ,
  {
    key: "7",
    icon: () => h(ShoppingOutlined),
    label: "Khu thương mại",
    title: "Khu thương mại",
  },
]);
const handleClick = (menuInfo) => {
  console.log("click ", menuInfo);
};
</script>
