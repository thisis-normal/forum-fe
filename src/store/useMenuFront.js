import { defineStore } from 'pinia'

export const useMenuFront = defineStore('menuId', {

    state: () => ({
        selectedKeys: [],
        openKeys: [],
    }),
    actions: {
        onSelectedKeys(data) {
            this.selectedKeys = data;
            console.log("aaaa:" + this.selectedKeys)
        },
        onOpenKeys(data) {
            this.openKeys = data;
        }
    }

})