<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="
      background-color: #f2fafd;
      height: 96vh;
      border-radius: 30px;
      margin: 0;
      padding: 12px;
      overflow: hidden;
    "
  >
    <div
      style="
        width: 60%;
        height: 80%;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      "
      class="row"
    >
      <div
        class="col-6 d-flex flex-column justify-content-center align-items-center"
      >
        <h1>Đặt lại mật khẩu</h1>
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            class="m-0 mb-2"
            name="password"
            :rules="[{ validator: validatePassword }]"
          >
            <label for="">Mật khẩu</label>
            <a-input-password
              v-model:value="formState.password"
              placeholder="Mật khẩu"
              size="large"
            >
            </a-input-password>
          </a-form-item>
          <a-form-item
            class="m-0 mb-2"
            name="confirmPassword"
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
            <label for="">Xác nhận mật khẩu</label>
            <a-input-password
              v-model:value="formState.confirmPassword"
              size="large"
              placeholder="Xác nhận mật khẩu"
            >
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button my-2"
              style="width: 100%"
              size="large"
            >
              Quên mật khẩu
            </a-button>

            <br />
          </a-form-item>
        </a-form>
      </div>
      <div class="col-6" style="display: flex; align-items: center">
        <div
          style="border-left: 2px solid rgba(0, 0, 0, 0.3); height: 90%"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref } from "vue";
import Swal from "sweetalert2";
import { handleRequestError } from "../../../store/errorHandler.js";
import router from "@/router";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get("email");
const token = urlParams.get("token");
const formState = reactive({
  email: "",
  token: "",
  password: "",
  confirmPassword: "",
});
formState.email = email;
formState.token = token;
const onFinish = () => {
  axios
    .post("reset-password", {
      email: formState.email,
      token: formState.token,
      password: formState.password,
      password_confirmation: formState.confirmPassword,
    })
    .then(function (response) {
      if (response.status === 200) {
        Swal.fire({
          title: response.data.message + "!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          router.push("/login");
        });
      }
    })

    .catch(function (error) {
      handleRequestError(error);
    });
};
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== formState.password) {
    callback(
      "Mật khẩu xác nhận không khớp. Vui lòng nhập lại mật khẩu chính xác!"
    );
  } else {
    callback();
  }
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
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.password && formState.confirmPassword);
});
</script>
