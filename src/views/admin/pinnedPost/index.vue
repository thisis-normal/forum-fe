<template>
  <a-card title="Tài khoản" style="width: 100%">
    <div class="row">
      <!-- <div class="col-12 d-flex justify-content-end align-items-center my-3">
        <router-link :to="{ name: 'admin-users-add' }">
          <BtnCreate />
        </router-link>
      </div> -->
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }">
          <!-- <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
              <router-link :to="{ name: 'admin-users-edit' }">
                <BtnEdit />
              </router-link>

              <BtnDel />
            </template>
          </template> -->
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
    useMenu().onSelectedKeys("admin-pinnedPost");
    const users = ref([]);

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Tài khoản",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Mật khẩu",
        dataIndex: "password",
        key: "password",
        // Đặt hide để ẩn cột mật khẩu khỏi bảng
        hide: true,
      },
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
        title: "Vai trò",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        fixed: "right",
      },
    ];
    const getUsers = () => {
      axios
        .get("http://127.0.0.1:5173/user.json")
        .then(function (response) {
          users.value = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    getUsers();
    return {
      getUsers,
      users,
      columns,
    };
  },
};
</script>
