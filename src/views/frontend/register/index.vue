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
        width: 50%;
        height: 80%;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      "
      class="row"
    >
      <div
        class="col-12 d-flex flex-column justify-content-center align-items-center"
      >
        <h2 class="mt-3">Đăng ký</h2>
        <a-form
          style="width: 80%"
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
                validator: validateUsername,
              },
            ]"
          >
            <label for="">Tài khoản</label>
            <a-input v-model:value="formState.username" placeholder="Tài khoản">
            </a-input>
          </a-form-item>
          <a-form-item
            class="m-0 mb-2"
            name="fullname"
            :rules="[
              {
                required: true,
                message: 'Vui lòng nhập họ và tên của bạn!',
              },
              {
                max: 100,
                message: 'Vui lòng nhập họ và tên không quá 100 ký tự!',
              },
              {
                validator: validateFullname,
              },
            ]"
          >
            <label for="">Họ và tên </label>
            <a-input v-model:value="formState.fullname" placeholder="Họ và tên">
            </a-input>
          </a-form-item>
          <a-form-item
            class="m-0 mb-2"
            name="email"
            :rules="[
              {
                type: 'email',
                required: true,
                message: 'Vui lòng nhập email của bạn!',
              },
            ]"
          >
            <label for="">Email </label>
            <a-input v-model:value="formState.email" placeholder="Email">
            </a-input>
          </a-form-item>
          <a-form-item
            class="m-0 mb-2"
            name="password"
            :rules="[{ validator: validatePassword }]"
          >
            <label for="">Mật khẩu</label>
            <a-input-password
              v-model:value="formState.password"
              placeholder="Mật khẩu"
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
              placeholder="Xác nhận mật khẩu"
            >
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button my-3"
              style="width: 100%"
            >
              Đăng ký
            </a-button>

            <br />

            <span style="color: rgba(0, 0, 0, 0.5)">
              Bạn đã có tài khoản ?
            </span>
            <a href="/login">Đăng nhập ngay!</a>
          </a-form-item>
        </a-form>
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
  confirmPassword: "",
  remember: true,
});
const users = ref([]);
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 30,
  },
};
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
  return !(
    formState.username &&
    formState.password &&
    formState.username.length >= 8 &&
    formState.username.length <= 50
  );
});
const validateUsername = (rule, value, callback) => {
  if (value.length < 8 || value.length > 50) {
    callback(new Error("Tài khoản phải có từ 8 đến 50 ký tự!"));
  } else if (/\s/.test(value)) {
    callback(new Error("Tài khoản không được chứa khoảng trắng!"));
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
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== formState.password) {
    callback(
      "Mật khẩu xác nhận không khớp. Vui lòng nhập lại mật khẩu chính xác!"
    );
  } else {
    callback();
  }
};
const validateFullname = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
    callback(new Error("Họ và tên không được chứa ký tự đặc biệt!"));
  } else {
    callback();
  }
};
</script>
