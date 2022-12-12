import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStore = defineStore("user", () => {
    let user = reactive({});
    return user;
})