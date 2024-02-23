import { defineStore } from 'pinia'

export const useMenu = defineStore('menuId', {

    state: () => ({

        selectedKeys: [],
        openKeys: [],
    }),
    actions: {
        onSelectedKeys(data) {
            this.selectedKeys[1] = data;
            console.log(this.selectedKeys)
        },
        onOpenKeys(data) {
            this.openKeys = data;
        }
    }

})