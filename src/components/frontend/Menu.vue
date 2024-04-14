<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 100%; background-color: rgba(0, 0, 0, 0); border: none"
    mode="vertical"
    @click="handleClick"
  >
    <a-menu-item
      v-for="item in items"
      :key="item.forum_group_id.toString()"
      :item="item"
      style="height: 50px"
    >
      <div
        class="d-flex align-items-center"
        style="font-size: 16px; height: 50px"
      >
        <DynamicIcon
          v-if="item.icon_name"
          :name="item.icon_name"
          style="font-size: 24px; margin-right: 12px"
        />
        <div v-else></div>
        {{ item.forum_group }}
      </div>
    </a-menu-item>
  </a-menu>
</template>
<script setup>
import { h, ref, onMounted, onBeforeMount } from "vue";
import DynamicIcon from "../Icon.vue";
import axios from "axios";

import { useRouter, useRoute } from "vue-router";
import { useMenuFront } from "../../store/useMenuFront.js";
const router = useRouter();
const route = useRoute();
const items = ref([]);
const store = useMenuFront();
const { selectedKeys, openKeys } = store;
const getCategory = async () => {
  try {
    const response = await axios.get("home/forum-list");
    items.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getCategory();
});
const handleClick = (menuInfo) => {
  console.log(menuInfo);
  if (menuInfo && menuInfo.item && menuInfo.item.item) {
    const { forum_group_id } = menuInfo.item.item;
    const menuItem = items.value.find(
      (item) => item.forum_group_id === forum_group_id
    );
    if (menuItem && menuItem.forum_group_id) {
      router.push({
        name: "content",
        params: { id: menuItem.forum_group_id },
      });
    }
  }
};
</script>
