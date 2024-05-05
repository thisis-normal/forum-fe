<template>
  <a-card title="Thêm chủ đề" style="width: 100%">
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item
        label="Tên chủ đề"
        :name="['forumGroups', 'name']"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.forumGroups.name" />
      </a-form-item>
      <a-form-item
        label="Mô tả"
        :name="['forumGroups', 'description']"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.forumGroups.description" />
      </a-form-item>
      <a-form-item
        label="Icon"
        :name="['forumGroups', 'icon']"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.forumGroups.icon" />
      </a-form-item>
      <a-form-item label="Icon đã lấy:" id="icon" :rules="[{ required: true }]">
        <DynamicIcon
          :name="formState.forumGroups.icon"
          @error="handleIconError"
        />
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
    <div class="btnBack" style="position: absolute; top: 12px; right: 24px">
      <router-link :to="{ name: 'admin-categorys' }">
        <RollbackOutlined style="font-size: 24px" />
      </router-link>
    </div>
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
  required: "${label} không được để trống",
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
      icon_name: formState.forumGroups.icon,
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
const handleIconError = (error) => {
  console.error("Error in DynamicIcon:", error);
  this.formState.forumGroups.icon = null; // Set icon to null on error
};
</script>
