<template>
  <div>{{ route.params.id }}</div>

  <div v-for="item in categorys.subcategories" :key="item.id">
    {{ item.name }}
  </div>

  {{ categorys.img }}
  <TextEditor />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, watch } from "vue";
import TextEditor from "../../../components/frontend/TextEditor.vue";
// import {}
const route = useRoute();
const router = useRouter();
const categorys = ref([]);
const img = ref([]);
const getImg = () => {
  axios
    .get("http://127.0.0.1:8000/api/view-image")
    .then((response) => {
      img.value = response.data;
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
const getCategory = (categoryId) => {
  axios
    .get("http://127.0.0.1:8000/api/image")
    .then((response) => {
      categorys.value = response.data.find(
        (category) => category.categoryId === categoryId
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
watch(
  () => route.params.id,
  (newId, oldId) => {
    getCategory(newId);
  }
);
const categoryId = route.params.id;
getCategory(categoryId);
getImg();
</script>
