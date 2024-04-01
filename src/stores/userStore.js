import { defineStore } from 'pinia'
import { ref } from 'vue'
export const userStore = defineStore('user', () => {
  const userName = ref(null)
})
