<template>
  <a-card title="Thêm tài khoản" style="width: 100%">
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item
        :name="['username']"
        label="Tài khoản"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        :name="['password']"
        label="Mật khẩu"
        :rules="[{ validator: validatePassword }]"
      >
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <a-form-item
        :name="['email']"
        label="Email"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item
        :name="['full_name']"
        label="Họ và tên"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.full_name" />
      </a-form-item>

      <a-form-item label="Quyền người dùng">
        <a-select @change="handleChange" v-model:value="formState.role">
          <a-select-option key="2" value="user"> </a-select-option>
          <a-select-option key="1" value="admin"> </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Tạo tài khoản</a-button>
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
import Swal from "sweetalert2";
import router from "@/router";

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
  required: "${label} không được để trống",
};
const formState = reactive({
  username: "",
  password: "",
  email: "",
  full_name: "",
  role: "user",
});
const handleChange = (value) => {
  formState.role = value;
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 8) {
    callback(new Error("Mật khẩu phải có ít nhất 8 ký tự!"));
  } else if (!/^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]+$/.test(value)) {
    callback(
      new Error("Mật khẩu chỉ chứa các ký tự chữ cái, số và ký tự đặc biệt!")
    );
  } else if (
    !/[a-z]/.test(value) ||
    !/[A-Z]/.test(value) ||
    !/\d/.test(value)
  ) {
    callback(
      new Error(
        "Mật khẩu phải chứa ít nhất một ký tự viết thường, một ký tự viết hoa và một số!"
      )
    );
  } else {
    callback();
  }
};
const onFinish = (values) => {
  axios
    .post("admin/users", {
      username: formState.username,
      email: formState.email,
      password: formState.password,
      full_name: formState.full_name,
      role: formState.role,
    })
    .then(function (response) {
      Swal.fire({
        title: "Thêm mới thành công!",

        icon: "success",
        confirmButtonText: "OK",
      });

      router.push(`/admin/users`);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      Swal.fire({
        title: error.response.data.message + "!",

        icon: "error",
        confirmButtonText: "OK",
      });
    });
};
</script>
