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
      <a-form-item label="Cấm người dùng">
        <a-checkbox
          @change="handleChangeBan"
          :checked="formState.banned === 1"
        ></a-checkbox>
      </a-form-item>
      <a-form-item label="Lý do" v-if="checkBan">
        <a-input v-model:value="formState.banned_reason" />
      </a-form-item>
      <a-form-item label="Thời gian" v-if="checkBan">
        <a-date-picker v-model:value="formState.banned_until" />
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
import Swal from "sweetalert2";
import router from "@/router";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { reactive, ref } from "vue";
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
  email: "",
  full_name: "",
  role: "",
  banned: "",
  banned_reason: "",
  banned_until: "",
});
const checkBan = ref(false);
const handleChange = (value) => {
  formState.role = value;
};
const handleChangeBan = (value) => {
  formState.banned = value.target.checked ? 1 : 0;
  if (formState.banned === 1) {
    checkBan.value = true;
  } else {
    checkBan.value = false;
    formState.banned_until = null;
    formState.banned_reason = null;
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
const route = useRoute();

const getUser = async () => {
  await axios
    .get(`admin/users/${route.params.id}`)
    .then(function (response) {
      console.log(response);
      formState.email = response.data.data.user.email;
      formState.full_name = response.data.data.user.full_name;
      formState.role = response.data.data.user.roles[0].name;
      formState.banned = response.data.data.user.banned;
      formState.banned_reason = response.data.data.user.banned_reason;
      formState.banned_until = response.data.data.user.banned_until;
      if (formState.banned === 1) {
        checkBan.value = true;
        formState.banned_until = dayjs(
          response.data.data.user.banned_until.split(" ")[0],
          "YYYY-MM-DD"
        );
      } else {
        checkBan.value = false;
        formState.banned_until = null;
        formState.banned_reason = null;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      // Swal.fire({
      //   title: error.response.data.message + "!",

      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
    });
};
const getdate = (date) => {
  const fullDateString = date.toString();
  const parts = fullDateString.split(" "); // Tách chuỗi dựa vào khoảng trắng

  const month = parts[1]; // May
  const dayOfMonth = parts[2]; // 23
  const year = parts[3]; // 2024

  return year + "-" + month + "-" + dayOfMonth;
};
getUser();
const onFinish = async (values) => {
  if (formState.banned === 1) {
    let date;
    if (formState.banned_until === null) {
      // Lấy ngày mai nếu formState.banned_until bằng null
      date = dayjs().add(1, "day").format("YYYY-MM-DD");
    } else {
      // Nếu formState.banned_until có giá trị, định dạng theo yêu cầu
      date = dayjs(formState.banned_until.$d).format("YYYY-MM-DD");
    }
    await axios
      .patch(`admin/users/${route.params.id}`, {
        email: formState.email,
        full_name: formState.full_name,
        role: formState.role,
        banned: formState.banned,
        banned_reason: formState.banned_reason,
        banned_until: date,
      })
      .then(function (response) {
        Swal.fire({
          title: "Cập nhật thành công!",

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
  } else {
    await axios
      .patch(`admin/user/${route.params.id}`, {
        email: formState.email,
        full_name: formState.full_name,
        role: formState.role,
        banned: formState.banned,
        banned_reason: formState.banned_reason,
        banned_until: formState.banned_until,
      })
      .then(function (response) {
        Swal.fire({
          title: "Cập nhật thành công!",

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
  }
  // await axios
  //   .post("admin/users", {
  //     username: formState.username,
  //     email: formState.email,
  //     password: formState.password,
  //     full_name: formState.full_name,
  //     role: formState.role,
  //   })
  //   .then(function (response) {
  //     Swal.fire({
  //       title: "Thêm mới thành công!",

  //       icon: "success",
  //       confirmButtonText: "OK",
  //     });

  //     router.push(`/admin/users`);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //     Swal.fire({
  //       title: error.response.data.message + "!",

  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   });
};
</script>
