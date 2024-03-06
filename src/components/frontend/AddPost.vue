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
      <a-form-item>
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
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              :style="{ background: option.color }"
            >
              <span>{{ option.label }}</span>
            </a-select-option>
          </a-select>
          <a-input placeholder="Tiêu đề bài viết" size="large" />
        </div>
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
        <TextEditor style="height: 150px" />
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
import TextEditor from "./TextEditor.vue";
// import { TextEditor } from "./TextEditor.vue";
const emit = defineEmits(["closeAddPost"]);
const urlApi = import.meta.env.VITE_URL_API;
const urlTest = import.meta.env.VITE_URL_TEST;
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
    color: "#7392ff",
  },
  {
    value: "lucy",
    label: "Lucy",
    color: "#439222",
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
