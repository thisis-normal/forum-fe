<template>
  <div class="container-fuild">
    <div
      class="row align-items-center"
      style="background-color: #494949; padding: 1rem"
    >
      <div
        class="col-1 d-flex d-sm-none justify-content-center align-items-center"
      >
        <span @click="showDrawer()"><BarsOutlined /></span>
      </div>
      <div
        class="col-10 col-sm-9 d-flex justify-content-sm-start justify-content-center align-items-center"
      >
        <LoadingOutlined class="me-3" />
        <div class="d-none d-sm-flex text-white">Quản trị</div>
      </div>
      <div
        class="col-sm-3 d-none d-sm-flex justify-content-sm-end align-items-center text-white"
      >
        admin
      </div>
      <div
        class="col-1 d-flex d-sm-none justify-content-center align-items-center"
      >
        <span @click="showDrawerTk()"><UserOutlined /></span>
      </div>
    </div>
  </div>
  <a-drawer v-model:visible="open" title="Danh mục" placement="left">
    <TheMenu />
  </a-drawer>
  <a-drawer v-model:visible="openTk" title="Tài khoản" placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script setup>
import {
  BarsOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import TheMenu from "../components/Menu.vue";
const urlApi = import.meta.env.VITE_URL_API;
const urlTest = import.meta.env.VITE_URL_TEST;
const open = ref(false);
const openTk = ref(false);

const showDrawer = () => {
  open.value = true;
};

const showDrawerTk = () => {
  openTk.value = true;
};
</script>
