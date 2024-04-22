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
            <template v-if="column.key === 'avatar'">
              <a-avatar>
                <template #icon>
                  <img src="http://127.0.0.1:5173/public/panh.jpg" alt=""
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
<script>
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import BtnCreate from "../../../components/BtnCreate.vue";
import BtnEdit from "../../../components/BtnEdit.vue";
import BtnDel from "../../../components/BtnDel.vue";

import { defineComponent, ref } from "vue";
import { useMenu } from "../../../store/useMenu.js";

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    BtnCreate,
    BtnEdit,
    BtnDel,
  },
  setup() {
    useMenu().onSelectedKeys("admin-users");
    const users = ref([]);
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
      },
      {
        title: "Họ",
        dataIndex: "first_name",
        key: "first_name",
      },
      // {
      //   title: "Mật khẩu",
      //   dataIndex: "password",
      //   key: "password",
      //   // Đặt hide để ẩn cột mật khẩu khỏi bảng
      //   hide: true,
      // },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Họ và tên",
        dataIndex: "fullname",
        key: "fullname",
      },
      {
        title: "Ảnh",
        dataIndex: "avatar",
        key: "avatar",
        width: "7%",
      },
      {
        title: "Mã sinh viên",
        dataIndex: "studentid",
        key: "studentid",
      },
      {
        title: "Cấm",
        dataIndex: "banned",
        key: "banned",
        width: "7%",
      },
      {
        title: "Thời gian",
        dataIndex: "bannedUntil",
        key: "bannedUntil",
      },
      {
        title: "Lý do",
        dataIndex: "bannedReason",
        key: "bannedReason",
      },
      {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        fixed: "right",
      },
    ];
    const getUsers = () => {
      axios.get("");
    };

    getUsers();
    return {
      users,
      columns,
    };
  },
};
</script>
