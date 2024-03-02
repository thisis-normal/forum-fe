<template>
  <a-card title="Tài khoản" style="width: 100%">
    <div class="row">
      <div class="col-12 d-flex justify-content-end align-items-center my-3">
        <router-link :to="{ name: 'admin-users-add' }">
          <BtnCreate/>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin-users-edit', params: { id: record.id } }"
              >
                <BtnEdit />
              </router-link>

              <BtnDel/>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>
<script>
import {PlusOutlined, EditOutlined} from "@ant-design/icons-vue";
import BtnCreate from "../../../components/BtnCreate.vue";
import BtnEdit from "../../../components/BtnEdit.vue";
import BtnDel from "../../../components/BtnDel.vue";

import {defineComponent, ref} from "vue";
import {useMenu} from "../../../store/useMenu.js";

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
      },
      {
        title: "Họ",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Tên",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "Birthday",
        dataIndex: "birth_date",
        key: "birth_date",
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        // Đặt hide để ẩn cột mật khẩu khỏi bảng
        hide: true,
      }
      // ,
      // {
      //   title: "Email",
      //   dataIndex: "email",
      //   key: "email",
      // }
      // // ,
      // {
      //   title: "Vai trò",
      //   dataIndex: "role",
      //   key: "role",
      // },
      // {
      //   title: "Thao tác",
      //   dataIndex: "action",
      //   key: "action",
      //   fixed: "right",
      // },
    ];
    const getUsers = () => {
      axios
          .put("http://127.0.0.1:2002/api/student-put/5 ",
              {
                "first_name": "áda",
                "last_name": "bro"
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
          )
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
      users,
      columns,
    };
  },
};
</script>
