<template>
  <a-card title="Cập nhật chủ đề con" style="width: 100%">
    <div class="btnBack" style="position: absolute; top: 12px; right: 24px">
      <router-link
        :to="{
          name: 'admin-category-forum',
          params: { id: formId },
        }"
      >
        <RollbackOutlined style="font-size: 24px" />
      </router-link>
    </div>
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item label="Tên chủ đề con" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.name" />
      </a-form-item>
      <a-form-item label="Mô tả" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.description" />
      </a-form-item>
      <a-form-item label="Url hiển thị" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.slug" />
      </a-form-item>

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Cập nhật</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMenu } from "../../../store/useMenu.js";
import router from "@/router";
import Swal from "sweetalert2";
useMenu().onSelectedKeys("admin-categorys");
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const formId = localStorage.getItem("forum");
const route = useRoute();
const validateMessages = {
  required: "${label} is required!",
};
const formState = reactive({
  forumGroups: {
    name: "",
    description: "",
    slug: "",
  },
});
const forumGroups = ref([]);
const onFinish = (values) => {
  axios
    .put(`forum/${route.params.id}`, {
      forum_group_id: localStorage.getItem("forum"),
      name: formState.forumGroups.name,
      description: formState.forumGroups.description,
      slug: formState.forumGroups.slug,
      user_id: sessionStorage.getItem("user_id"),
    })
    .then(function (response) {
      Swal.fire({
        title: "Cập nhật thành công!",
        //   text: response.data.message + "!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        router.push(`/admin/categorys/${route.params.id}/forum`);
      });
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
  str = str.replace(/à|á|ạ|ả|ã|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ế|ề|ể|ễ|ệ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");

  str = str.replace(/ /g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
  str = str.replace(/[^a-zA-Z0-9\-]/g, ""); // Cho phép giữ lại dấu "-"

  str = str.replace(/-+/g, "-"); // Thêm dấu cách sau mỗi dấu "-"

  str = str.replace(/^-+|-+$/g, "");

  str = str.toLowerCase(); // Chuyển đổi sang dạng in thường

  return str;
};

// Sử dụng watch để theo dõi thay đổi của 'name' và cập nhật 'slug'
watch(
  () => formState.forumGroups.name,
  (newValue) => {
    formState.forumGroups.slug = generateSlug(newValue);
  }
);
const getCategory = (values) => {
  axios
    .get(`forum/${route.params.id}`)
    .then(function (response) {
      forumGroups.value = response.data;

      formState.forumGroups.name = forumGroups.value.name;
      formState.forumGroups.description = forumGroups.value.description;
      formState.forumGroups.slug = forumGroups.value.slug;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};
getCategory();
</script>
