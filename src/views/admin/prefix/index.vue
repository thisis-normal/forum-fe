<template>
  <a-card title="Tiền tố" style="width: 100%">
    <div class="row">
      <div class="col-12 d-flex justify-content-end align-items-center my-3">
        <router-link :to="{ name: 'admin-prefix-add' }">
          <BtnCreate />
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="forum" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'id'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'color'">
              <div
                :style="{ background: record.color }"
                style="
                  height: 30px;
                  border-radius: 5px;
                  text-align: center;
                  padding: 2px;
                "
              >
                {{ record.name }}
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin-prefix-edit', params: { id: record.id } }"
              >
                <BtnEdit />
              </router-link>

              <BtnDel @click="deleteCategory(record.id, record.name)" />
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>
<script>
import {
  PlusOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons-vue";

import BtnCreate from "../../../components/BtnCreate.vue";
import BtnEdit from "../../../components/BtnEdit.vue";
import BtnDel from "../../../components/BtnDel.vue";

import { defineComponent, ref } from "vue";
import { useMenu } from "../../../store/useMenu.js";

import { useRoute } from "vue-router";
import Swal from "sweetalert2";
export default {
  components: {
    PlusOutlined,
    EditOutlined,
    BtnCreate,
    BtnEdit,
    BtnDel,
    UnorderedListOutlined,
  },
  setup() {
    useMenu().onSelectedKeys("admin-prefix");
    const forumGroups = ref([]);
    const forum = ref([]);

    const route = useRoute();
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Tên tiền tố",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        // Đặt hide để ẩn cột mật khẩu khỏi bảng
        hide: true,
      },
      {
        title: "Màu",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        fixed: "right",
      },
    ];
    const getforums = () => {
      axios
        .get(`prefix`)
        .then(function (response) {
          forum.value = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const deleteCategory = (id, name) => {
      Swal.fire({
        title: `Bạn có muốn xóa tiền tố ${name}`,

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`prefix/${id}`)
            .then(function (response) {
              Swal.fire({
                title: `Xóa thành công tiền tố ${name}!`,
                // text: "Your file has been deleted.",
                icon: "success",
              }).then((result) => {
                window.location.reload();
              });
            })
            .catch(function (error) {
              Swal.fire({
                title: `Xóa không thành công tiền tố ${name}!`,
                // text: "Your file has been deleted.",
                icon: "error",
              });
            });
        }
      });
    };

    getforums();

    return {
      getforums,
      forumGroups,
      columns,
      deleteCategory,
      forum,
      route,
    };
  },
};
</script>
