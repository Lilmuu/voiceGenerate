<template>
  <view class="login">
    <view class="top pl-64rpx pr-64rpx">
      <view class="font-size-48rpx font-bold pt-220rpx">
        <view>Hello!</view>
        <view class="mt-6rpx">欢迎登录硅灵造物</view>
      </view>
      <view class="mb-20rpx">
        <view class="loginForm">
          <text class="text">+86</text>
          <u-input :type="'number'" :maxlength="11" class="ml-16rpx" border="none" color="#0b0b0b" v-model="phone" placeholder="请输入手机号" :spellcheck="false"></u-input>
        </view>
        <view class="loginForm">
          <u-input :type="'number'" :maxlength="4" border="none" color="#0b0b0b" v-model="smsCode" placeholder="请输入验证码" :spellcheck="false"></u-input>
          <view class="code" @click="getCode">{{ codeStatus ? '获取验证码' : `${countDown}秒后可获取` }}</view>
        </view>
      </view>
    </view>
    <view class="pl-64rpx pr-64rpx">
      <u-button class="loginBtn" @click="handleLogin">立即登录</u-button>
      <view class="font-size-28rpx text-center color-#7e7f90 mt-24rpx">未注册的手机号验证后即可完成注册</view>
    </view>
    <view class="privacy">
      <u-checkbox-group v-model="checked">
        <u-checkbox class="mr-8rpx" :name="true" :shape="'circle'" activeColor="rgba(0, 171, 3, 1)"></u-checkbox>
      </u-checkbox-group>
      <view>我已阅读并同意</view>
      <view class="color-#00ab03" @click="jumpTo('user')">《用户协议》</view>
      <view>和</view>
      <view class="color-#00ab03" @click="jumpTo('privacy')">《隐私协议》</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getSmsCode,login } from "@/api/modules/user"
import { userStore } from '@/store/index'
import { useGenerateStore } from '@/store/index'

const user = userStore()
const generateStore = useGenerateStore()

const phone = ref('')
const smsCode = ref('')
const checked = ref([false])
const codeStatus = ref(true)
const countDown = ref(60)

const validPhone = () => {
  if(!phone.value) {
    uni.showToast({
      title: '请先填写手机号',
      icon: 'none',
      mask: true
    })
    return false
  }
  const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
  const valid = reg.test(phone.value)
  if(!valid) {
    uni.showToast({
      title: '手机号填写错误',
      icon: 'none',
      mask: true
    })
    return false
  }
  return true
}

const handleCountDown = () => {
  setTimeout(() => {
    if(countDown.value > 1) {
      countDown.value--
      handleCountDown()
    }else {
      codeStatus.value = true
      countDown.value = 60
    }
  }, 1000);
}

const getCode = () => {
  if(!validPhone()) return 
  if(!codeStatus.value) return
  codeStatus.value = false
  handleCountDown()
  getSmsCode({ phone:phone.value }).then((res:any) => {
    if(res.status !== 200) return uni.showToast({
      title: `${res.msg}`,
      icon: 'none',
      mask: true
    })
    // smsCode.value = res.code
  })
}

const handleLogin = () => {
  console.log(checked.value);
  
  if(!validPhone()) return 
  if(!smsCode.value) return uni.showToast({
    title: '请先填写验证码',
    icon: 'none',
  })
  if(!checked.value[0]) return uni.showToast({
    title: '请先勾选并同意用户协议和隐私协议',
    icon: 'none',
  })
  login({ phone: phone.value,code: smsCode.value }).then((res:any) => {
    if(res.status !== 200) return uni.showToast({
      title: `${res.message}`,
      icon: 'none',
      mask: true
    })
    user.userInfo = res.user_data
    generateStore.getDefaultVoice()
    uni.setStorageSync('token', res.access_token_key)
    uni.setStorageSync('userInfo', res.user_data)
    uni.showToast({
      title: '登录成功',
      icon: 'none',
      position: 'bottom'
    })
    uni.switchTab({
      url: '/pages/index/index'
    })
  })
}

const jumpTo = (key:string) => {
  uni.navigateTo({ url: `/pages/mine/privacyAndUser?key=${key}` })
}
</script>

<style lang="scss" scoped>
.top {
  height: 708rpx;
  background: url('@/static/image/login/login_bg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.loginForm {
  height: 132rpx;
  border-bottom: 2rpx solid rgba(204, 204, 204, 1);
  display: flex;
  align-items: flex-end;
  padding-bottom: 24rpx;
  .text {
    padding-right: 12rpx;
    border-right: 2rpx solid rgba(204, 204, 204, 1);
  }
  .code {
    font-size: 32rpx;
    color: rgba(0, 171, 3, 1);
    margin-left: 20rpx;
  }
}
.loginBtn {
  margin-top: 128rpx;
  height: 96rpx;
  border-radius: 20rpx;
  background: $base-background;
}
.privacy {
  font-size: 24rpx;
  @include flexCenter();
  position: fixed;
  bottom: 148rpx;
  left: 0;
  right: 0;
  margin: auto;
}
</style>

<!-- <script lang="ts" setup>
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
              type="password"
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
</style> -->
