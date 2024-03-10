import { defineStore } from 'pinia'

export const useMenuFront = defineStore('menuId', {

    state: () => ({
        selectedKeys: [],
        openKeys: [],
    }),
    actions: {
        onSelectedKeys(data) {
            this.selectedKeys[0] = data;
            // console.log("aaaa:" + (data === "14"))
        },
        onOpenKeys(data) {
            this.openKeys = data;
        }
    }

})