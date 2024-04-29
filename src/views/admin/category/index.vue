<template>
  <a-card title="Quản lý chủ đề" style="width: 100%">
    <div class="row">
      <div class="col-12 d-flex justify-content-end align-items-center my-3">
        <router-link :to="{ name: 'admin-category-add' }">
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
          :pagination="{ pageSize: 5 }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'id'">
              {{ index + 1 }}
            </template>
            <template v-else-if="column.key === 'icon_name'">
              <template v-if="record.icon_name">
                <DynamicIcon :name="record.icon_name" />
              </template>
              <template v-else> </template>
              <!-- <DynamicIcon :name="record.icon_name" /> -->
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin-category-edit', params: { id: record.id } }"
              >
                <BtnEdit />
              </router-link>

              <BtnDel @click="deleteCategory(record.id, record.name)" />

              <router-link
                :to="{
                  name: 'admin-category-forum',
                  params: { id: record.id },
                }"
              >
                <a-button style="background-color: #009c10"
                  ><UnorderedListOutlined style="color: #fff" />
                </a-button>
              </router-link>
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
import DynamicIcon from "../../../components/Icon.vue";
import BtnCreate from "../../../components/BtnCreate.vue";
import BtnEdit from "../../../components/BtnEdit.vue";
import BtnDel from "../../../components/BtnDel.vue";
import Swal from "sweetalert2";
import { defineComponent, ref } from "vue";
import { useMenu } from "../../../store/useMenu.js";
import router from "@/router";
export default {
  components: {
    PlusOutlined,
    EditOutlined,
    BtnCreate,
    BtnEdit,
    BtnDel,
    UnorderedListOutlined,
    DynamicIcon,
  },
  setup() {
    useMenu().onSelectedKeys("admin-categorys");
    const forumGroups = ref([]);

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 100,
        align: "center",
      },
      {
        title: "Tên chủ đề",
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
        title: "Icon",
        dataIndex: "icon_name",
        key: "icon_name",
        width: 100,
        align: "center",
      },

      {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: 200,
        align: "center",
      },
    ];
    const getforumGroups = () => {
      axios
        .get("forum-group")
        .then(function (response) {
          forumGroups.value = response.data;
          console.log(forumGroups);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const deleteCategory = (id, name) => {
      Swal.fire({
        title: `Bạn có muốn xóa chủ đề ${name}`,

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`forum-group/${id}`)
            .then(function (response) {
              Swal.fire({
                title: `Xóa thành công chủ đề ${name}!`,
                // text: "Your file has been deleted.",
                icon: "success",
              }).then((result) => {
                window.location.reload();
              });
            })
            .catch(function (error) {
              Swal.fire({
                title: `Xóa không thành công chủ đề ${name}!`,
                // text: "Your file has been deleted.",
                icon: "error",
              });
            });
        }
      });
    };
    getforumGroups();
    return {
      forumGroups,
      columns,
      deleteCategory,
    };
  },
};
</script>
