import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('userStore', () => {
  const userInfo = ref(uni.getStorageSync('userInfo'))

  const removeLogin = () => {
    userInfo.value = ''
    uni.removeStorageSync('userInfo')
    uni.removeStorageSync('token')
  }
  return {
    userInfo,
    removeLogin
  }
})
