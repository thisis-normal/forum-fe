<template>
    category
</template>
<script>
import {useMenu} from "../../../store/useMenu.js"
export default {
    setup() {
        useMenu().onSelectedKeys("admin-categorys")
    },
}
</script>