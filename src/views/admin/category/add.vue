<template>
  <a-card title="Thêm danh mục" style="width: 100%">
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item label="Tên danh mục" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.name" />
      </a-form-item>
      <a-form-item label="Mô tả" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.description" />
      </a-form-item>
      <a-form-item label="Icon" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.icon" />
      </a-form-item>
      <a-form-item label="Icon đã lấy:" id="icon" :rules="[{ required: true }]">
        <DynamicIcon :name="formState.forumGroups.icon" />
      </a-form-item>
      <a-form-item label="Lấy tên icon">
        <a href="https://www.antdv.com/components/icon" target="_blank"
          >Tại đây !</a
        >
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Thêm mới</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import { reactive } from "vue";
import router from "@/router";
import Swal from "sweetalert2";
import DynamicIcon from "../../../components/Icon.vue";
import { useMenu } from "../../../store/useMenu.js";
useMenu().onSelectedKeys("admin-categorys");
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
    icon: "",
  },
});
const onFinish = (values) => {
  axios
    .post("forum-group", {
      name: formState.forumGroups.name,
      description: formState.forumGroups.description,
    })
    .then(function (response) {
      Swal.fire({
        title: "Thêm mới thành công!",
        //   text: response.data.message + "!",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/admin/categorys");
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
</script>
