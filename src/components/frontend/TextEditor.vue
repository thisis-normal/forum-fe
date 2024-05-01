<template>
  <QuillEditor
    class="editor"
    ref="myTextEditor"
    v-model:content="quillContent"
    @update:content="handleInput"
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
  />
</template>

<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const quillContent = ref(""); // Trường hợp mặc định là chuỗi, sửa lại tùy vào cấu trúc Delta của bạn
const rawHtml = ref(""); // Sử dụng ref để khai báo rawHtml như một reactive variable
const rawDelta = ref({});
const myTextEditor = ref(null);
const convertDeltaToHtml = (delta) => {
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  rawHtml.value = converter.convert(); // Gán giá trị được chuyển đổi
  return rawHtml.value;
};
const convertHtmlToDelta = (html) => {
  if (myTextEditor.value) {
    const quillEditor = myTextEditor.value.getQuill();
    const delta = quillEditor.clipboard.convert(html);
    quillContent.value = delta; // Cập nhật Delta mới vào quillContent
  }
};
const handleInput = (newContent) => {
  convertDeltaToHtml(newContent);
  convertHtmlToDelta(rawHtml);
};
defineExpose({
  convertDeltaToHtml,
});
</script>
