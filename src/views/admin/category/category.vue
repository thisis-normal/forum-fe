<template>
  <a-card :title="`Nhóm ${forum.name}`" style="width: 100%">
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
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin-category-edit', params: { id: record.id } }"
              >
                <BtnEdit />
              </router-link>

              <BtnDel @click="deleteCategory(record.id)" />
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
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    const getforumGroups = () => {
      axios
        .get("forum-group")
        .then(function (response) {
          forumGroups.value = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    const deleteCategory = (id) => {
      axios
        .delete(`forum-group/${id}`)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    getforumGroups();
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
