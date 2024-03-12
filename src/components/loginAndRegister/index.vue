<script lang="ts" setup>
import { ref } from 'vue'
import { mineApi } from '@/api'
import { userStore } from '@/store/index'

const user = userStore()

const loginForm = ref({
  phone: '',
  password: ''
})

const uToastRef = ref()

const login = async () => {
  if (
    loginForm.value.password.length === 0 ||
    loginForm.value.phone.length === 0
  ) {
    return uni.showToast({
      title: `账号或密码不能为空`,
      icon: 'none',
      position: 'bottom'
    })
  }
  const res = (await mineApi.login(loginForm.value)) as any
  console.log(res)
  if (res.status === 401) {
    return uni.showToast({
      title: '账号或密码错误',
      icon: 'none',
      position: 'bottom'
    })
  }
  if (res.status === 200) {
    user.userInfo = res.user_data
    uni.setStorageSync('token', res.access_token_key)
    uni.setStorageSync('userInfo', res.user_data)
    uni.switchTab({
      url: '/pages/index/index'
    })
    return uni.showToast({
      title: '登录成功',
      icon: 'none',
      position: 'bottom'
    })
  }
}
</script>

<template>
  <view class="login-register-box">
    <view class="login-form-box p-6">
      <view class="mt4 color-white font-700 mb8">账号密码登录</view>
      <view class="form-box p-2">
        <u-form :model="loginForm">
          <u-form-item prop="loginForm.phone">
            <u-input
              border="none"
              color="#cccccc"
              v-model="loginForm.phone"
              placeholder="请输入您的用户名"
            ></u-input>
          </u-form-item>
          <u-form-item prop="loginForm.password">
            <u-input
              border="none"
              color="#cccccc"
              v-model="loginForm.password"
              placeholder="请输入您的密码"
            ></u-input>
          </u-form-item>
        </u-form>
      </view>
      <view class="login-btn mt4">
        <u-button @click="login">登录</u-button>
        <view class="accord flex mt4">
          <text class="text">我已阅读并同意《服务条款》《隐私政策》</text>
        </view>
      </view>
    </view>
    <u-toast ref="uToastRef"></u-toast>
  </view>
</template>

<style lang="scss" scoped>
.login-register-box {
  height: 100vh;
  position: relative;
  .login-form-box {
    position: absolute;
    height: 80%;
    width: 100%;
    background-color: #16162e;
    bottom: 0;
    border-top-right-radius: 60rpx;
    border-top-left-radius: 60rpx;
    .form-box {
      width: 100%;
      border-radius: 20rpx;
      border: 1px solid #bbbbbb;
    }
    .login-btn {
      .accord {
        justify-content: center;
        align-items: center;
        .text {
          font-size: 12px;
          color: #bbbbbb;
        }
      }
    }
  }
}
</style>
