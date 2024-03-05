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
        <h1>Đăng nhập với ULSA</h1>
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
            <label for="">Mã sinh viên</label>
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

            <br />
            <div class="">
              <div style="color: rgba(0, 0, 0, 0.5)">
                Hoặc đăng nhập với tài khoản khác
              </div>
            </div>
            <router-link to="/login">
              <a-button
                type="primary"
                class="login-form-button my-2"
                style="width: 100%"
                size="large"
              >
                Đăng nhập thường
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
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const urlApi = import.meta.env.VITE_URL_API;
const urlTest = import.meta.env.VITE_URL_TEST;
const users = ref([]);
const onFinish = () => {
  axios
    .get("http://127.0.0.1:5173/user.json")
    .then(function (response) {
      users.value = response.data;
      const userArray = users.value;
      const foundUser = userArray.find(
        (user) =>
          user.username === formState.username &&
          user.password === formState.password
      );
      if (!foundUser) {
        alert(`Username or Password is incorrect.`);
      } else {
        sessionStorage.setItem("loggedIn", JSON.stringify(true));
        window.location.href = "/";
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
