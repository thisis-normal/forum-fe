<template>
  <div
    style="
      position: fixed;
      top: 0px;
      left: 0px;

      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    "
    @click="closeInfoUser()"
  ></div>
  <div
    style="
      width: 60%;
      height: 90%;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    "
  >
    <a-form
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px; width: 100%"
    >
      <div class="title d-flex justify-content-center">
        <h1 class="text-center mt-3">Thông tin tài khoản</h1>

        <a-button
          @click="closeInfoUser()"
          shape="circle"
          style="position: absolute; top: 24px; right: 24px; background-color: #d8dadf"
          ><CloseOutlined
        /></a-button>
      </div>
      <a-form-item class="text-center">
        <a-avatar :size="150">
          <template #icon>
            <img :src="user.avatar_path" alt="" />
          </template>
        </a-avatar>
        <br />
        @{{ user.username }}
        <br />
        <a-button>Đổi ảnh đại điện</a-button>
      </a-form-item>
      <a-form-item class="my-2">
        <label for="">Họ và tên</label>

        <a-input
          placeholder="Họ và Tên"
          v-model:value="formState.fullname"
          size="large"
        />
      </a-form-item>
      <a-form-item v-if="user.student_id === null">
        <label for="">Email</label>

        <a-input placeholder="Email" v-model:value="formState.email" size="large" />
      </a-form-item>
      <a-form-item v-if="user.student_id === null">
        <a style="color: #7392ff" @click="hidenPassword">Đổi mật khẩu</a>
      </a-form-item>
      <a-form-item>
        <a-button
          style="
            width: 100%;
            height: 40px;
            color: #fff;
            background-color: #7392ff;
            font-size: larger;
          "
          >Cập nhật tài khoản</a-button
        >
      </a-form-item>
    </a-form>
  </div>
  <div
    v-if="isDisabled"
    style="
      width: 60%;
      height: 90%;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    "
  >
    <a-form
      :model="formPass"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px; width: 100%"
      @finish="onFinish"
    >
      <div class="title d-flex justify-content-center">
        <h1 class="text-center mt-3">Đổi mật khẩu</h1>

        <a-button
          @click="hidenPassword"
          shape="circle"
          style="position: absolute; top: 24px; right: 24px; background-color: #d8dadf"
          ><CloseOutlined
        /></a-button>
      </div>
      <a-form-item class="text-center">
        <a-avatar :size="150">
          <template #icon>
            <img :src="user.avatar_path" alt="" />
          </template>
        </a-avatar>
        <br />
        @{{ user.username }}
        <br />
        <!-- <a-button>Đổi ảnh đại điện</a-button> -->
      </a-form-item>
      <a-form-item class="my-2" name="oldPassword">
        <label for="">Nhập mật khẩu cũ</label>

        <a-input-password v-model:value="formPass.oldPassword" size="large">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        class="my-2"
        name="newPassword"
        :rules="[{ validator: validatePassword }]"
      >
        <label for="">Nhập mật khẩu mới</label>

        <a-input-password v-model:value="formPass.newPassword" size="large">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        name="rePassword"
        :rules="[
          {
            required: true,
            message: 'vui lòng nhập lại mật khẩu của bạn!',
          },
          {
            validator: validateConfirmPassword,
          },
        ]"
      >
        <label for="">Xác nhận mật khẩu mới</label>

        <a-input-password v-model:value="formPass.rePassword" size="large">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          class="login-form-button my-2"
          html-type="submit"
          :disabled="disabled"
          style="
            width: 100%;
            height: 40px;
            color: #fff;
            background-color: #7392ff;
            font-size: larger;
          "
          >Đổi mật khẩu</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
const componentDisabled = ref(true);
import { CloseOutlined } from "@ant-design/icons-vue";
import { defineEmits } from "vue";
import TextEditor from "./TextEditor.vue";
import axios from "axios";
import { handleRequestError } from "../../store/errorHandler.js";
import Swal from "sweetalert2";
// import { TextEditor } from "./TextEditor.vue";
const formState = reactive({
  avatar: "",
  fullname: "",
  email: "",
  password: "",
  rePassword: "",
});
const formPass = reactive({
  oldPassword: "",
  newPassword: "",
  rePassword: "",
});
const disabled = computed(() => {
  return !(formPass.oldPassword && formPass.newPassword && formPass.rePassword);
});
const isDisabled = ref(false);
const emit = defineEmits(["closeInfoUser"]);
const user = ref([]);
const getPrefix = () => {
  axios
    .get("user/profile")
    .then(function (response) {
      user.value = response.data;
      formState.avatar = user.value.avatar;
      formState.fullname = user.value.full_name;
      formState.email = user.value.email;
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.log(error);
    });
};
const onFinish = () => {
  axios
    .put("user/password", {
      password: formPass.oldPassword,
      new_password: formPass.newPassword,
    })
    .then(function (response) {
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: response.data.message,

        confirmButtonText: "OK",
      });
    })
    .catch(function (error) {
      handleRequestError(error);
    });
};
getPrefix();
const closeInfoUser = () => {
  emit("closeInfoUser");
};
const wrapperCol = {
  span: 28,
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log("blur");
};
const handleFocus = () => {
  console.log("focus");
};
const hidenPassword = () => {
  isDisabled.value = !isDisabled.value;
};
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 8) {
    callback(new Error("Mật khẩu phải có ít nhất 8 ký tự!"));
  } else if (!/^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]+$/.test(value)) {
    callback(new Error("Mật khẩu chỉ chứa các ký tự chữ cái, số và ký tự đặc biệt!"));
  } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
    callback(
      new Error(
        "Mật khẩu phải chứa ít nhất một ký tự viết thường, một ký tự viết hoa và một số!"
      )
    );
  } else {
    callback();
  }
};
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== formPass.newPassword) {
    callback("Mật khẩu xác nhận không khớp. Vui lòng nhập lại mật khẩu chính xác!");
  } else {
    callback();
  }
};
const value = ref(undefined);
</script>
