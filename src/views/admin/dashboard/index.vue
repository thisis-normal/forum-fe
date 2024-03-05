<template>Dashboard</template>
<script>
import { useMenu } from "../../../store/useMenu.js";
export default {
  setup() {
    useMenu().onSelectedKeys("admin-dashboard");
    const urlApi = import.meta.env.VITE_URL_API;
    const urlTest = import.meta.env.VITE_URL_TEST;
  },
};
</script>
