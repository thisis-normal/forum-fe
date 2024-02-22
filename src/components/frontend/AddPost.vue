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
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px; width: 100%"
    >
      <div class="title d-flex justify-content-center">
        <h1 class="text-center mt-3">Bài viết</h1>
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
      <a-form-item>
        <label for="">Tiêu đề bài viết</label>
        <br />
        <a-input placeholder="Tiêu đề bài viết" size="large" />
      </a-form-item>
      <a-form-item>
        <label for="">Danh mục bài viết</label>
        <br />
        <a-select
          size="large"
          placeholder="Danh mục bài viết"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        ></a-select>
      </a-form-item>
      <a-form-item>
        <label for="">Nội dung</label>
        <br />
        <a-textarea :rows="4" placeholder="Nội dung" />
      </a-form-item>

      <a-form-item>
        <label for="">Upload</label>
        <br />
        <a-upload action="/upload.do" list-type="picture-card">
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item>
        <a-button
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

const emit = defineEmits(["closeAddPost"]);

const closeAddPost = () => {
  emit("closeAddPost");
};
const wrapperCol = {
  span: 28,
};
const options = ref([
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "tom",
    label: "Tom",
  },
]);
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
