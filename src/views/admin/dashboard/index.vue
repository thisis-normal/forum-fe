<template>
    Dashboard
</template>
<script>
import {useMenu} from "../../../store/useMenu.js"
export default {
    setup() {
        useMenu().onSelectedKeys("admin-dashboard")
    },
}
</script>