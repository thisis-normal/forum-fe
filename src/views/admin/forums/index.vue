<template>
  <a-card :title="`Quản lý chủ đề con`" style="width: 100%">
    <div class="row">
      <div class="col-12 d-flex justify-content-end align-items-center my-3">
        <router-link
          :to="{ name: 'admin-forum-add', params: { id: route.params.id } }"
        >
          <BtnCreate />
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table
          :dataSource="forumGroups"
          :columns="columns"
          :scroll="{ x: 576 }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'id'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin-forum-edit', params: { id: record.id } }"
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
    useMenu().onSelectedKeys("admin-categorys");
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
        title: "Tên diễn đàn",
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
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        fixed: "right",
      },
    ];
    const getforums = () => {
      axios
        .get(`forum-group/${route.params.id}`)
        .then(function (response) {
          forum.value = response.data;
          forumGroups.value = response.data.forums;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const deleteCategory = (id, name) => {
      Swal.fire({
        title: `Bạn có muốn xóa chủ đề con ${name}`,

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`forum/${id}`)
            .then(function (response) {
              Swal.fire({
                title: `Xóa thành công chủ đề con ${name}!`,
                // text: "Your file has been deleted.",
                icon: "success",
              }).then((result) => {
                window.location.reload();
              });
            })
            .catch(function (error) {
              Swal.fire({
                title: `Xóa không thành công chủ đề con ${name}!`,
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
