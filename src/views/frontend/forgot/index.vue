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
        <h1>Quên mật khẩu</h1>
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            class="m-0 mb-2"
            name="email"
            :rules="[
              {
                required: true,
                message: 'Vui lòng nhập email đăng ký!',
              },
            ]"
          >
            <label for="">Email</label>
            <a-input
              v-model:value="formState.email"
              size="large"
              placeholder="Nhập email đăng ký"
            >
              <template #prefix>
                <MailOutlined class="site-form-item-icon" />
              </template>
            </a-input>
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
            <div class="">
              <div style="color: rgba(0, 0, 0, 0.5)">Hoặc đăng nhập</div>
            </div>
            <router-link to="/login">
              <a-button
                type="primary"
                class="login-form-button my-2"
                style="width: 100%"
                size="large"
              >
                Đăng nhập
              </a-button>
            </router-link>
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

const formState = reactive({
  email: "",
});
const onFinish = () => {
  axios
    .post("forgot-password", {
      email: formState.email,
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

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !formState.email;
});
</script>
