<template>
  <div class="container-fuild">
    <div class="row align-items-center" style="padding: 1rem">
      <div class="col-1 d-flex d-sm-none justify-content-center align-items-center">
        <span @click="showDrawer()"><BarsOutlined /></span>
      </div>
      <div
        class="col-10 col-sm-3 d-flex justify-content-sm-start justify-content-center align-items-center"
      >
        <LoadingOutlined class="me-3" />
        <div class="d-none d-sm-flex text-black">LOGO</div>
      </div>
      <div class="col-sm-6 d-none d-sm-flex justify-content-sm-center">
        <a-space direction="vertical">
          <a-input-search
            v-model:value="value"
            placeholder="input search text"
            style="width: 60vh"
            size="large"
            @search="onSearch"
          />
        </a-space>
      </div>
      <div
        class="col-sm-3 d-none d-sm-flex align-items-center text-black justify-content-end"
        v-if="!token"
      >
        <router-link to="/login" style="text-decoration: none; color: black">
          <span
            style="
              border-right: 1px solid rgba(0, 0, 0);
              margin-right: 12px;
              padding-right: 8px;
            "
            >Đăng nhập</span
          >
        </router-link>
        <router-link to="/register" style="text-decoration: none; color: black">
          <span>Đăng ký</span>
        </router-link>
      </div>
      <div class="col-sm-3 d-none d-sm-flex align-items-center text-black row" v-else>
        <div class="col-5 d-flex justify-content-end align-items-center">
          <CommentOutlined style="font-size: 20px" />
          <BellOutlined style="font-size: 20px" class="mx-2" />
          <a-button class="" type="primary" shape="circle" @click="showAddPost()"
            ><PlusOutlined
          /></a-button>
        </div>
        <a-dropdown :trigger="['click']" style="" class="col-5 hover">
          <a class="ant-dropdown-link" @click.prevent>
            <a-avatar>
              <template #icon><UserOutlined /></template>
            </a-avatar>
            NTC
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0"> Thông tin tài khoản </a-menu-item>

              <a-menu-divider />
              <a-menu-item key="2" @click="logout">Đăng xuất</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="col-1 d-flex d-sm-none justify-content-center align-items-center">
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
  PlusOutlined,
  DownOutlined,
  CommentOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const emit = defineEmits(["showAddPost"]);
const router = useRouter();
const urlApi = import.meta.env.VITE_URL_API;
const urlTest = import.meta.env.VITE_URL_TEST;
const showAddPost = () => {
  emit("showAddPost");
};
const value = ref("");
console.log(token);
const logout = () => {
  axios
    .post(urlApi + "logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        localStorage.removeItem("token");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  router.push("/login");
};
const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  console.log("or use this.value", value.value);
};
</script>
