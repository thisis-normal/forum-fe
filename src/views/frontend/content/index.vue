<template>
  <div>{{ route.params.id }}</div>

  <img :src="categorys.img" alt="" />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, watch } from "vue";
// import {}
const route = useRoute();
const router = useRouter();
const categorys = ref([]);
const getCategory = (categoryId) => {
  axios
    .get("http://127.0.0.1:5173/category.json")
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
</script>
