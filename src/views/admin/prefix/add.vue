<template>
  <a-card title="Thêm tiêu đề" style="width: 100%">
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item label="Tên tiêu đề" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.name" />
      </a-form-item>
      <a-form-item label="Mô tả" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.description" />
      </a-form-item>
      <a-form-item label="Màu">
        <a-input v-model:value="formState.forumGroups.color" type="color" />
      </a-form-item>
      <a-form-item label="tiêu đề hiển thị">
        <div
          :style="{
            background: formState.forumGroups.color,
          }"
          style="
            height: 30px;
            width: 100px;
            border-radius: 5px;
            text-align: center;
            line-height: 30px;
            font-weight: bold;
            font-size: 16px;
            overflow: hidden;
            padding: 0 4px 0 4px;
          "
        >
          {{ formState.forumGroups.name }}
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Thêm mới</a-button>
      </a-form-item>
    </a-form>
    <div class="btnBack" style="position: absolute; top: 12px; right: 24px">
      <router-link :to="{ name: 'admin-prefix' }">
        <RollbackOutlined style="font-size: 24px" />
      </router-link>
    </div>
  </a-card>
</template>
<script setup>
import { reactive, watch } from "vue";
import router from "@/router";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";

import { useMenu } from "../../../store/useMenu.js";
useMenu().onSelectedKeys("admin-prefix");

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
};
const formState = reactive({
  forumGroups: {
    name: "",
    description: "",
    color: "#b8b8b8",
  },
});

const route = useRoute();

const onFinish = (values) => {
  axios
    .post("prefix", {
      name: formState.forumGroups.name,
      description: formState.forumGroups.description,
      color: formState.forumGroups.color,
    })
    .then(function (response) {
      Swal.fire({
        title: "Thêm mới thành công!",

        icon: "success",
        confirmButtonText: "OK",
      });

      router.push(`/admin/prefix`);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      Swal.fire({
        title: error.response.data.message + "!",
        //   text: response.data.message + "!",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
};
const generateSlug = (str) => {
  return str;
};

// Sử dụng watch để theo dõi thay đổi của 'name' và cập nhật 'slug'
watch(
  () => formState.forumGroups.name,
  (newValue) => {
    formState.forumGroups.name = generateSlug(newValue);
  }
);
watch(
  () => formState.forumGroups.color,
  (newValue) => {
    console.log(newValue);
    formState.forumGroups.color = generateSlug(newValue);
  }
);
</script>
