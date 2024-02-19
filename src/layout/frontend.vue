<template>
  <div
    style="
      background-color: #f2fafd;
      height: 96vh;
      border-radius: 30px;
      margin: 0;
      padding: 12px;
      overflow: hidden;
    "
  >
    <TheHeader />
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-sm-3 d-none d-sm-flex">
          <a-list style="width: 100%">
            <TheMenu />
          </a-list>
        </div>
        <div class="col-sm-9 col-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from "../components/frontend/Header.vue";
import TheMenu from "../components/frontend/Menu.vue";
export default {
  components: {
    TheHeader,
    TheMenu,
  },
};
</script>
