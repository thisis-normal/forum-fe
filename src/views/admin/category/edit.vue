<template>
  <a-card title="Cập nhật danh mục" style="width: 100%">
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
        <a-button type="primary" html-type="submit">Cập nhật</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useMenu } from "../../../store/useMenu.js";
import router from "@/router";
import Swal from "sweetalert2";
import DynamicIcon from "../../../components/Icon.vue";
useMenu().onSelectedKeys("admin-categorys");
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const route = useRoute();
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
const forumGroups = ref([]);
const onFinish = (values) => {
  if (!isValidIcon(formState.forumGroups.icon)) {
    Swal.fire({
      title: "Icon không hợp lệ!",
      text: "Vui lòng kiểm tra lại icon.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  axios
    .put(`forum-group/${route.params.id}`, {
      name: formState.forumGroups.name,
      description: formState.forumGroups.description,
      icon_name: formState.forumGroups.icon,
      // icon:
    })
    .then(function (response) {
      router.push("/admin/categorys");
      Swal.fire({
        title: "Cập nhật thành công!",
        //   text: response.data.message + "!",
        icon: "success",
        confirmButtonText: "OK",
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
const getCategory = (values) => {
  axios
    .get(`forum-group/${route.params.id}`)
    .then(function (response) {
      forumGroups.value = response.data;

      formState.forumGroups.name = forumGroups.value.name;
      formState.forumGroups.description = forumGroups.value.description;
      formState.forumGroups.icon = forumGroups.value.icon_name;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const isValidIcon = (iconName) => {
  return iconName && iconName.length > 0;
};
getCategory();
</script>
