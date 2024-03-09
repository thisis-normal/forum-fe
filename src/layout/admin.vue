<template>
  <TheHeader />
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-sm-2 d-none d-sm-flex">
        <a-list bordered style="width: 100%">
          <TheMenu />
          <template #header>
            <div>BẢNG ĐIỀU KHIỂN</div>
          </template>
        </a-list>
      </div>
      <div class="col-sm-10 col-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from "../components/Header.vue";
import TheMenu from "../components/Menu.vue";
export default {
  components: {
    TheHeader,
    TheMenu,
  },
};
</script>
