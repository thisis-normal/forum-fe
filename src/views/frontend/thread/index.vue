<template>
  <div
    class="directional pb-2"
    style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
  >
    {{ nameForum.title }}
  </div>

  <a-list
    size="large"
    style="height: 75vh; overflow: auto; padding-top: 12px; padding-right: 4px"
    :pagination="pagination"
  >
    <span
      style="border-radius: 5px; padding: 5px"
      :style="{ background: nameForum.prefix_color }"
      >{{ nameForum.prefix_name }}</span
    >

    {{ nameForum.title }}

    <div
      style="
        width: 100%;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 12px 12px 36px 12px;
        margin-top: 12px;
        position: relative;
      "
    >
      <!-- <div><img :src="urlPublic + nameForum." alt="" /></div> -->

      <div class="d-flex">
        <div class="me-2">
          <a-avatar>
            <template #icon>
              <img :src="nameForum.user_avatar" alt="" />
            </template>
          </a-avatar>
        </div>
        <div>
          {{ nameForum.user_full_name }}
        </div>
      </div>
      <div v-html="nameForum.content"></div>
      <div class="reply" style="position: absolute; bottom: 12px; right: 12px">
        <a href="#TextEditor"><SendOutlined /> Trả lời </a>
      </div>
    </div>
    <a-list-item class="p-0" v-for="item in post" :key="item.id">
      <div class="" style="width: 100%">
        <div
          style="
            width: 100%;
            padding-right: 24px;
            font-size: 16px;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 12px 12px 36px 12px;
            margin-top: 12px;
            position: relative;
          "
        >
          <div class="d-flex align-items-center">
            <a-avatar size="">
              <template #icon>
                <img :src="item.user_avatar" alt="" />
              </template>
            </a-avatar>
            <div class="mx-2">
              {{ item.user_full_name }}

              <div style="font-size: 12px">
                {{ item.created_at }}
              </div>
            </div>
          </div>
          <div v-html="item.content"></div>
          <div
            class="reply"
            style="position: absolute; bottom: 12px; right: 12px"
          >
            <a href="#TextEditor"><SendOutlined /> Trả lời </a>
          </div>
        </div>
      </div>
    </a-list-item>
    <a-form
      :model="formState"
      name="normal_post"
      class="post-form"
      @finish="onFinish"
    >
      <div style="margin: 12px 0">
        <TextEditor
          id="TextEditor"
          style="height: 150px; background-color: #ffffff"
          v-model:content="quillContent"
          @input="handleInput"
          ref="myTextEditor"
        />
        <a-button
          style="margin: 12px 0"
          size="large"
          type="primary"
          html-type="submit"
          >Đăng câu trả lời <SendOutlined
        /></a-button>
      </div>
    </a-form>
  </a-list>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import TextEditor from "../../../components/frontend/TextEditor.vue";
import Swal from "sweetalert2";

import axios from "axios";
import { ref, watch, onMounted, reactive } from "vue";
import { useMenuFront } from "../../../store/useMenuFront.js";

const route = useRoute();

const router = useRouter();
const params = route.params.slug;
const parts = params.split(".");
const result = parts[1];
const myTextEditor = ref(null);

const quillContent = ref(""); // Sử dụng ref để tạo reactive variable cho v-model
const formState = reactive({
  thread_id: result,
  content: "",
});
const nameForum = ref([]);
useMenuFront().onSelectedKeys(sessionStorage.getItem("idCategory"));
watch(route, () => {
  useMenuFront().onSelectedKeys(sessionStorage.getItem("idCategory"));
});
const handleInput = () => {
  console.log(quillContent.value);
  console.log(myTextEditor.value.convertDeltaToHtml(quillContent.value));

  formState.content = myTextEditor.value.convertDeltaToHtml(quillContent.value);
};
const pagination = {
  onChange: (page) => {
    console.log(page);
  },
  pageSize: 1,
};
const data = ref([]);
const post = ref([]);

// Lấy dữ liệu theo chủ đề
const getNameForum = async (id) => {
  await axios
    .get(`thread/${id}`)
    .then((response) => {
      nameForum.value = response.data;
      data.value = response.data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
const onFinish = async () => {
  await axios
    .post(`post`, {
      thread_id: formState.thread_id,
      content: formState.content,
    })
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      Swal.fire({
        title: error.response.data.message + "!",
        //   text: response.data.message + "!",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
};

const getPost = async (id) => {
  await axios
    .get(`thread/${id}/posts`)
    .then((response) => {
      post.value = response.data.data;
      console.log(post);
    })
    .catch((error) => {
      console.log(error);
    });
};
// const getImg = () => {
//   axios
//     .get("view-image")
//     .then((response) => {
//       // Xử lý dữ liệu từ API nếu cần
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const ForumId = result;
watch(
  () => result,
  (newId, oldId) => {
    getNameForum(newId);
  }
);
onMounted(() => {
  getNameForum(result);
  getPost(result);
  // getImg();
});
</script>
