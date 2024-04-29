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
      <a-form-item label="Icon" :rules="[{ required: true }]">
        <a-input v-model:value="formState.forumGroups.icon" />
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
    icon: "",
  },
});
const forumGroups = ref([]);
const onFinish = (values) => {
  axios
    .put(`forum-group/${route.params.id}`, {
      name: formState.forumGroups.name,
      description: formState.forumGroups.description,
      icon_name: formState.forumGroups.icon,
      // icon:
    })
    .then(function (response) {
      Swal.fire({
        title: "Cập nhật thành công!",
        //   text: response.data.message + "!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        router.push("/admin/categorys");
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
getCategory();
</script>
