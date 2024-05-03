<template>
  <a-card title="Cập nhật tài khoản" style="width: 100%">
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item
        :name="['user', 'email']"
        label="Email"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
      <a-form-item
        :name="['user', 'name']"
        label="Họ và tên"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.user.name" />
      </a-form-item>

      <a-form-item :name="['user', 'name']" label="Quyền người dùng">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item label="Cấm người dùng">
        <a-checkbox></a-checkbox>
      </a-form-item>
      <a-form-item :name="['user', 'name']" label="Lý do">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item :name="['user', 'name']" label="Thời gian">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit"
          >Cập nhât tài khoản</a-button
        >
      </a-form-item>
      <div class="btnBack" style="position: absolute; top: 12px; right: 24px">
        <router-link :to="{ name: 'admin-users' }">
          <RollbackOutlined style="font-size: 24px" />
        </router-link>
      </div>
    </a-form>
  </a-card>
</template>
<script setup>
import { reactive } from "vue";
import { useMenu } from "../../../store/useMenu.js";
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
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const formState = reactive({
  user: {
    name: "",
    age: "",
    email: "",
    website: "",
    introduction: "",
  },
});
const onFinish = (values) => {
  console.log("Success:", values);
};
</script>
