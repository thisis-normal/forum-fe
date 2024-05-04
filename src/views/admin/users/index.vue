<template>
  <a-card title="Quản lý tài khoản" style="width: 100%">
    <div class="row">
      <div class="col-12 d-flex justify-content-end align-items-center my-3">
        <router-link :to="{ name: 'admin-users-add' }">
          <BtnCreate />
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="users" :columns="columns" :scroll="{ x: 800 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'avatar_path'">
              <a-avatar>
                <template #icon>
                  <img :src="record.avatar_path" alt=""
                /></template>
              </a-avatar>
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin-users-edit', params: { id: record.id } }"
              >
                <BtnEdit />
              </router-link>

              <BtnDel />
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>
<script setup>
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import BtnCreate from "../../../components/BtnCreate.vue";
import BtnEdit from "../../../components/BtnEdit.vue";
import BtnDel from "../../../components/BtnDel.vue";
import { ref } from "vue";
import { useMenu } from "../../../store/useMenu.js";
import axios from "axios"; // Đảm bảo đang import axios

// Cầu hình menu đã chọn
useMenu().onSelectedKeys("admin-users");

// Khai báo ref cho users
const users = ref([]);

// Cột bảng
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5%",
    align: "center",
  },
  {
    title: "Tài khoản",
    dataIndex: "username",
    key: "username",
    align: "center",
  },
  // Cột mật khẩu đã bị bỏ chú thích, có thể bỏ qua hoặc giữ lại tùy ý
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Họ và tên",
    dataIndex: "full_name",
    key: "full_name",
    align: "center",
  },
  {
    title: "Ảnh",
    dataIndex: "avatar_path",
    key: "avatar_path",
    width: "7%",
    align: "center",
  },
  {
    title: "Mã sinh viên",
    dataIndex: "student_id",
    key: "student_id",
    align: "center",
  },
  {
    title: "Cấm",
    dataIndex: "banned",
    key: "banned",
    width: "7%",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "banned_until",
    key: "banned_until",
    align: "center",
  },
  {
    title: "Lý do",
    dataIndex: "banned_reason",
    key: "banned_reason",
    align: "center",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    align: "center",
  },
];

// Hàm lấy thông tin người dùng
const getUsers = async () => {
  try {
    const response = await axios.get("admin/users");
    users.value = response.data.data.users;
  } catch (error) {}
};

// Kích hoạt lấy dữ liệu người dùng
getUsers();
</script>
