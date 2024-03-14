<script lang="ts" setup>
import { ref } from 'vue'
import { userStore } from '@/store/index'

const user = userStore()

const show = ref(false)

const loginOut = () => {
  user.userInfo = null
  uni.removeStorageSync('userInfo')
  show.value = false
  uni.navigateTo({ url: '/components/loginAndRegister/index' })
}
</script>

<template>
  <view class="system-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="系统设置"
    >
    </u-navbar>
    <view class="content-box">
      <u-cell title="权限设置" :isLink="true" arrow-direction="right"> </u-cell>
      <u-cell title="关于我们" :isLink="true" arrow-direction="right"> </u-cell>
      <u-cell
        @click="show = true"
        title="退出登录"
        :isLink="true"
        arrow-direction="right"
      >
      </u-cell>
    </view>
  </view>
  <u-popup mode="center" :round="10" :show="show">
    <view class="popup-box">
      <view>提示</view>
      <view class="mt mb">确定退出登录吗?</view>
      <view class="button-box">
        <u-button @click="show = false" class="mr" text="取消"></u-button>
        <u-button @click="loginOut" text="确定" type="primary"></u-button>
      </view>
    </view>
  </u-popup>
</template>

<style lang="scss" scoped>
.system-box {
  height: calc(100vh);
  .content-box {
    height: calc(100vh - 80rpx);
  }
}
.popup-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  width: 400rpx;
  .button-box {
    display: flex;
  }
}
</style>
