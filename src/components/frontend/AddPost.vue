<template>
  <div
    style="
      position: fixed;
      top: 0px;
      left: 0px;

      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    "
    @click="closeAddPost()"
  ></div>
  <div
    style="
      width: 60%;
      height: 90%;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    "
  >
    <a-form
      :model="formState"
      name="addPost"
      class="addPost"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px; width: 100%"
      @finish="onFinish"
    >
      <div class="title d-flex justify-content-center">
        <h1 class="text-center mt-3">Tạo bài viết</h1>
        <a-button
          @click="closeAddPost()"
          shape="circle"
          style="
            position: absolute;
            top: 24px;
            right: 24px;
            background-color: #d8dadf;
          "
          ><CloseOutlined
        /></a-button>
      </div>
      <a-form-item v-model:value="formState.title">
        <label for="">Tiêu đề bài viết</label>
        <br />
        <div class="d-flex">
          <a-select
            v-model:value="value"
            label-in-value
            style="width: 120px"
            size="large"
            @change="handleChange"
            placeholder="Thể loại"
          >
            <a-select-option
              v-for="option in prefix"
              :key="option.id"
              :value="option.id"
              :style="{ background: option.color }"
            >
              <span>{{ option.name }}</span>
            </a-select-option>
          </a-select>
          <a-input placeholder="Tiêu đề bài viết" size="large" />
        </div>
      </a-form-item>
      <a-form-item>
        <label for="">chủ đề bài viết</label>
        <br />
        <a-select
          size="large"
          placeholder="chủ đề bài viết"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <a-select-option
            v-for="option in forum"
            :key="option.id"
            :value="option.id"
            :style="{ background: option.color }"
          >
            <span>{{ option.name }}</span>
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-model:value="formState.content">
        <label for="">Nội dung</label>
        <br />
        <TextEditor style="height: 150px" />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          style="
            width: 100%;
            height: 40px;
            color: #fff;
            background-color: #7392ff;
            font-size: larger;
          "
          >Đăng bài</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const componentDisabled = ref(true);
import { CloseOutlined } from "@ant-design/icons-vue";
import { defineEmits } from "vue";
import TextEditor from "./TextEditor.vue";

import Swal from "sweetalert2";
const emit = defineEmits(["closeAddPost"]);
const idCategory = sessionStorage.getItem("idCategory");
const prefix = ref([]);
// console.log(TextEditor.quillContent.value);
const formState = reactive({
  forum_id: "",
  prefix_id: "",
  title: "",
  content: "",
  slug: "",
  image: "",
});
const onFinish = async () => {
  await axios
    .post("thread", {
      forum_id: 1,
      prefix_id: 1,
      slug: " formState.title",
      title: " formState.title",
      content: "formState.content",
    })
    .then(function (response) {
      Swal.fire({
        title: "Thêm mới thành công!",
        //   text: response.data.message + "!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          emit("closeAddPost");
        }
      });
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
const getPrefix = () => {
  axios
    .get("prefix")
    .then(function (response) {
      prefix.value = response.data;
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.log(error);
    });
};
getPrefix();
const forum = ref([]);
const getForum = () => {
  axios
    .get(`forum-group/${idCategory}`)
    .then(function (response) {
      forum.value = response.data.forums;
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.log(error);
    });
};
getForum();
const closeAddPost = () => {
  emit("closeAddPost");
};
const wrapperCol = {
  span: 28,
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log("blur");
};
const handleFocus = () => {
  console.log("focus");
};
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const value = ref(undefined);
</script>
