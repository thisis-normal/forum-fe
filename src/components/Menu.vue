<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
  >
    <a-menu-item key="admin-dashboard">
      <router-link :to="{ name: 'admin-dashboard' }" exact>
        <span><DashboardOutlined class="me-3" />Dashboard</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-users">
      <router-link :to="{ name: 'admin-users' }">
        <span><UserOutlined class="me-3" />Users</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-categorys">
      <router-link :to="{ name: 'admin-categorys' }">
        <span><AppstoreOutlined class="me-3" />Categorys</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-pinnedPost">
      <router-link :to="{ name: 'admin-pinnedPost' }">
        <span><CommentOutlined class="me-3" />Pinned Post</span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>
<script>
import {
  DashboardOutlined,
  UserOutlined,
  AppstoreOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "../store/useMenu.js";
export default defineComponent({
  components: {
    DashboardOutlined,
    UserOutlined,
    AppstoreOutlined,
    CommentOutlined,
  },
  setup() {
    const store = useMenu();
    const urlApi = import.meta.env.VITE_URL_API;
    const urlTest = import.meta.env.VITE_URL_TEST;
    return {
      ...storeToRefs(store),
    };
  },
});
</script>
