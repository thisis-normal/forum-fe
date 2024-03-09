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
    <TheHeader @showAddPost="toggleAddPostVisibility()" />

    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-sm-3 d-none d-sm-flex">
          <a-list style="width: 100%">
            <TheMenu />
          </a-list>
        </div>
        <div class="col-sm-6 col-12">
          <!-- <AddPost /> -->

          <router-view> </router-view>
        </div>
        <div class="col-sm-3 d-none d-sm-flex">
          <a-list style="width: 100%">
            <NewPost />
          </a-list>
        </div>
      </div>
    </div>
    <AddPost v-if="addPostVisible" @closeAddPost="hidenAddPost()" />
  </div>
</template>
<script>
import TheHeader from "../components/frontend/Header.vue";
import TheMenu from "../components/frontend/Menu.vue";
import AddPost from "../components/frontend/AddPost.vue";
import NewPost from "../components/frontend/NewPost.vue";
import { ref } from "vue";

export default {
  components: {
    TheHeader,
    TheMenu,
    AddPost,
    NewPost,
  },
  setup() {
    const addPostVisible = ref(false);

    const toggleAddPostVisibility = () => {
      addPostVisible.value = !addPostVisible.value;
    };
    const hidenAddPost = () => {
      addPostVisible.value = !addPostVisible.value;
    };
    // Trả về addPostVisible để component có thể sử dụng
    return {
      addPostVisible,
      toggleAddPostVisibility,
      hidenAddPost,
    };
  },
};
</script>
