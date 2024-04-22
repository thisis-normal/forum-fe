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
    <TheHeader
      @showAddPost="toggleAddPostVisibility()"
      @showInfoUser="toggleInfoUserVisibility()"
    />

    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-sm-3 d-none d-sm-flex">
          <a-list
            style="
              width: 100%;

              overflow: auto;
            "
          >
            <TheMenu />
          </a-list>
        </div>
        <div class="col-sm-6 col-12 pe-5">
          <!-- <AddPost /> -->

          <router-view> </router-view>
        </div>
        <div class="col-sm-3 d-none d-sm-flex flex-column">
          <a-list style="width: 100%; height: 65%">
            <NewPost style="width: 100%" />
          </a-list>
          <a-list class="">
            <Statistics />
          </a-list>
        </div>
      </div>
    </div>
    <AddPost v-if="addPostVisible" @closeAddPost="hidenAddPost()" />
    <InfoUser v-if="InfoUserVisible" @closeInfoUser="hidenInfoUser()" />
  </div>
</template>
x
<script>
import TheHeader from "../components/frontend/Header.vue";
import TheMenu from "../components/frontend/Menu.vue";
import AddPost from "../components/frontend/AddPost.vue";
import InfoUser from "../components/frontend/InfoUser.vue";
import Statistics from "../components/frontend/Statistics.vue";

import NewPost from "../components/frontend/NewPost.vue";
import { ref } from "vue";

export default {
  components: {
    TheHeader,
    TheMenu,
    AddPost,
    NewPost,
    InfoUser,
    Statistics,
  },
  setup() {
    const addPostVisible = ref(false);
    const InfoUserVisible = ref(false);

    const toggleAddPostVisibility = () => {
      addPostVisible.value = !addPostVisible.value;
    };
    const hidenAddPost = () => {
      addPostVisible.value = !addPostVisible.value;
    };
    const toggleInfoUserVisibility = () => {
      InfoUserVisible.value = !InfoUserVisible.value;
    };
    const hidenInfoUser = () => {
      InfoUserVisible.value = !InfoUserVisible.value;
    };
    // Trả về addPostVisible để component có thể sử dụng
    return {
      addPostVisible,
      toggleAddPostVisibility,
      hidenAddPost,
      InfoUserVisible,
      hidenInfoUser,
      toggleInfoUserVisibility,
    };
  },
};
</script>
