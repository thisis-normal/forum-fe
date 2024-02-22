<template>
  <div class="container-fuild">
    <div class="row align-items-center" style="padding: 1rem">
      <div
        class="col-1 d-flex d-sm-none justify-content-center align-items-center"
      >
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
      <div class="col-sm-3 d-none d-sm-flex align-items-center text-black">
        <a-button type="primary" shape="circle" @click="showAddPost()"
          ><PlusOutlined
        /></a-button>
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
  PlusOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["showAddPost"]);

const showAddPost = () => {
  emit("showAddPost");
};
const value = ref("");

const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  console.log("or use this.value", value.value);
};
</script>
