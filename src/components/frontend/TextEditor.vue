<template>
  <QuillEditor
    :toolbar="[
      { header: [1, 2, 3, 4, 5, 6, false] },
      { align: [] },
      'bold',
      'italic',
      'underline',
      'link',
      'image',
      'video',
      'formula',
    ]"
    v-model:content="quillContent"
    @input="handleInput"
  />
</template>

<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";

// Không cần tạo đối tượng Quill tại đây, QuillEditor sẽ tự quản lý

const quillContent = ref(""); // Sử dụng ref để tạo reactive variable cho v-model

const handleInput = () => {
  console.log(quillContent.value);
};
</script>
