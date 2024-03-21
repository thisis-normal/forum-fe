<template>
  <component :is="iconName" style="font-size: 24px" />
</template>

<script>
export default {
  props: ["name"],
  computed: {
    iconName() {
      // Chuyển đổi tên icon từ tên được lưu trong cơ sở dữ liệu sang định dạng PascalCase
      // Ví dụ: 'user-outlined' -> 'UserOutlined'
      return this.name.substring(1, this.name.length - 3);
    },
  },
};
</script>
