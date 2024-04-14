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
        class="col-sm-6 d-flex flex-column justify-content-center align-items-center"
      >
        <h2>Đăng nhập</h2>
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            class="m-0 mb-2"
            name="username"
            :rules="[
              {
                required: true,
                message: 'Vui lòng nhập tên tài khoản của bạn!',
              },
            ]"
          >
            <label for="">Tài khoản</label>
            <a-input v-model:value="formState.username" size="large">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            class="m-0 mb-2"
            name="password"
            :rules="[
              { required: true, message: 'vui lòng nhập mật khẩu của bạn!' },
            ]"
          >
            <label for="">Mật khẩu</label>
            <a-input-password v-model:value="formState.password" size="large">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <div class="d-flex" style="justify-content: space-between">
            <div>
              <a-checkbox v-model:checked="formState.remember"
                >Ghi nhớ tôi</a-checkbox
              >
            </div>
            <div>
              <a class="login-form-forgot" href="/forgotpassword"
                >Quên mật khẩu</a
              >
            </div>
          </div>

          <a-form-item>
            <a-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button my-2"
              style="width: 100%"
              size="large"
            >
              Đăng nhập
            </a-button>
            <div class="">
              <div style="color: rgba(0, 0, 0, 0.5)">
                Hoặc đăng nhập với tài khoản khác
              </div>
            </div>
            <router-link to="/login/ulsa">
              <a-button
                type="primary"
                class="login-form-button my-2"
                style="width: 100%"
                size="large"
              >
                Đăng nhập với ULSA
              </a-button>
            </router-link>
            <br />

            <span style="color: rgba(0, 0, 0, 0.5)">
              Bạn chưa có tài khoản ?
            </span>
            <a href="/register">Đăng ký ngay!</a>
          </a-form-item>
        </a-form>
      </div>
      <div
        class="col-sm-6 d-none d-sm-flex"
        style="display: flex; align-items: center"
      >
        <div
          style="border-left: 2px solid rgba(0, 0, 0, 0.3); height: 90%"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref } from "vue";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { handleRequestError } from "../../../store/errorHandler.js";
import Swal from "sweetalert2";
import router from "@/router";
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});

// const router = useRouter();
const users = ref([]);
const onFinish = () => {
  axios
    .post("login", {
      username: formState.username,

      password: formState.password,
    })
    .then(function (response) {
      const status = response.status;
      console.log(response.data);
      if (status === 200) {
        router.push("/");
        localStorage.setItem("token", response.data.token);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      } else {
        Swal.fire({
          title: "Đăng nhập thất bại!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    })
    .catch(function (error) {
      handleRequestError(error);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
