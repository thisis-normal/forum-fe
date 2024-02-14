<template>
    pinnedpost
</template>
<script>
import {useMenu} from "../../../store/useMenu.js"
export default {
    setup() {
        useMenu().onSelectedKeys("admin-pinnedPost")
    },
}
</script>