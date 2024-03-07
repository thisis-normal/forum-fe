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

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Cập nhật</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import Swal from "sweetalert2";

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
  },
});
const forumGroups = ref([]);
const onFinish = (values) => {
  axios
    .put(`forum-group/${route.params.id}`, {
      name: formState.forumGroups.name,
      description: formState.forumGroups.description,
    })
    .then(function (response) {
      Swal.fire({
        title: "Cập nhật thành công!",
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
const getCategory = (values) => {
  axios
    .get(`forum-group/${route.params.id}`)
    .then(function (response) {
      forumGroups.value = response.data;

      formState.forumGroups.name = forumGroups.value.name;
      formState.forumGroups.description = forumGroups.value.description;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};
getCategory();
</script>
