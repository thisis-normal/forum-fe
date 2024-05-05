<template>
  <a-card title="Tổng quan" style="width: 100%">
    <div style="width: 100%">
      <div style="display: flex; justify-content: space-around; margin: 12px 0">
        <div
          class="card"
          style="
            width: 30%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200px;
            border-radius: 10px;
            padding: 12px;
            font-size: 18px;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
            color: rgb(22, 119, 255);
          "
        >
          <div style="font-size: 30px"><TeamOutlined /></div>
          <div>{{ dashboard.user_count }}</div>
          <div style="">Tổng số người dùng</div>
        </div>
        <div
          class="card"
          style="
            width: 30%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200px;
            border-radius: 10px;
            padding: 12px;
            font-size: 18px;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
            color: rgb(73, 204, 144);
          "
        >
          <div style="font-size: 30px"><ReadOutlined /></div>
          <div>{{ dashboard.thread_count }}</div>

          <div style="">Tổng số bài viết</div>
        </div>
        <div
          class="card"
          style="
            width: 30%;
            color: rgb(217, 85, 167);

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200px;
            border-radius: 10px;
            padding: 12px;
            font-size: 18px;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
          "
        >
          <div style="font-size: 30px"><MessageOutlined /></div>
          <div>{{ dashboard.post_count }}</div>

          <div style="">Tổng số bình luận</div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-around">
        <div
          class="card"
          style="
            width: 30%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200px;
            border-radius: 10px;
            padding: 12px;
            font-size: 18px;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
          "
        >
          <div style="font-size: 30px"><UserOutlined /></div>
          <div>{{ dashboard.student_count }}</div>

          <div style="">Tổng số tài khoản</div>
          <div style="">sinh viên</div>
        </div>
        <div
          class="card"
          style="
            width: 30%;
            color: red;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200px;
            border-radius: 10px;
            padding: 12px;
            font-size: 18px;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
          "
        >
          <div style="font-size: 30px"><MehOutlined /></div>
          <div>{{ dashboard.banned_user_count }}</div>

          <div style="">Tổng số tài khoản</div>
          <div style="">bị cấm</div>
        </div>
        <div
          class="card"
          style="
            width: 30%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200px;
            border-radius: 10px;
            padding: 12px;
            font-size: 18px;
            color: rgb(137, 191, 4);
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
          "
        >
          <div style="font-size: 30px"><ReadOutlined /></div>
          <div>{{ dashboard.new_threads_last_7_days }}</div>

          <div style="">Tổng số bài viết</div>
          <div style="">trong 7 ngày</div>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script setup>
import { ref } from "vue";
import { useMenu } from "../../../store/useMenu.js";
import axios from "axios"; // Đảm bảo đang import axios
import Swal from "sweetalert2";

// Cầu hình menu đã chọn
useMenu().onSelectedKeys("admin-dashboard");
const dashboard = ref([]);
// Khai báo ref cho users

// Hàm lấy thông tin người dùng
const getDashboard = async () => {
  await axios
    .get("admin/statistics/forum")
    .then(function (response) {
      dashboard.value = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

// Kích hoạt lấy dữ liệu người dùng
getDashboard();
</script>
