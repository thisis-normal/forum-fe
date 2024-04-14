<template>
  <div
    class="directional pb-2"
    :style="{ 'border-bottom': '1px solid rgba(0, 0, 0, 0.2)' }"
  >
    {{ nameCategory }}
  </div>
  <a-list size="large" style="height: 75vh; overflow: auto">
    <a-list-item v-for="item in data" :key="item.id" class="p-0">
      <div class="row" style="width: 100%">
        <div
          class="col-8 d-flex align-items-center"
          :style="{ 'justify-content': 'space-between' }"
        >
          <div
            :style="{
              overflow: 'hidden',
              'text-overflow': 'ellipsis',
              'white-space': 'nowrap',
              width: '60%',
              'padding-right': '24px',
              'font-size': '20px',
            }"
          >
            <CommentOutlined class="me-3" />
            <router-link
              :to="{
                name: 'forum',
                params: { slug: `${item.slug}.${item.id}` },
              }"
            >
              {{ item.name }}
            </router-link>
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <span> Chủ đề </span>
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <span> Tin nhắn </span>
          </div>
        </div>
        <div class="col-4 d-flex align-items-center">
          <a-avatar size="large" class="me-3">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <div
            :style="{
              overflow: 'hidden',
              'text-overflow': 'ellipsis',
              'white-space': 'nowrap',
            }"
          >
            <div class="title">sssss</div>
            <div class="date">{{ item.date }}</div>
            <div class="art">Nguyễn thành chung</div>
          </div>
        </div>
      </div>
    </a-list-item>
  </a-list>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { CommentOutlined, UserOutlined } from "@ant-design/icons-vue";
import { useMenuFront } from "../../../store/useMenuFront.js";

const route = useRoute();
const router = useRouter();

const nameCategory = ref("");
const data = ref([]);
const firstItemId = ref(null);

const getFirstItem = async () => {
  try {
    const { data: items } = await axios.get("home/forum-list");
    const firstItem = items.length ? items[0] : null;
    if (firstItem) {
      firstItemId.value = firstItem.forum_group_id;
      useMenuFront().onSelectedKeys(firstItemId.value.toString());
      await getNameCategory(firstItemId.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const getNameCategory = async (id) => {
  try {
    const { data: response } = await axios.get(`forum-group/${id}`);
    nameCategory.value = response.name;
    data.value = response.forums;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getFirstItem();
});
</script>
