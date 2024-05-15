<template>
  <view class="system-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="系统设置"
      class="font-bold"
    >
    </u-navbar>
    <view class="content-box">
      <u-cell title="账户注销" arrow-direction="right" :isLink="true" @click="openModal"></u-cell>
    </view>
  </view>
  <u-modal :show="showLogOut" :showConfirmButton="false" title="账户注销">
    <view class="w-100%">
      <view class="text-center">确定注销账户吗?</view>
      <view class="mt-40rpx">
        <u-button class="modalBtn" @click="showLogOut = false">再想想</u-button>
        <u-button class="modalBtn" @click="handleLogOut">确定注销</u-button>
      </view>
    </view>
  </u-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { delUser } from "@/api/modules/generate"
import { userStore } from '@/store/index'

const user = userStore()
const showLogOut = ref(false)

const openModal = () => {
  showLogOut.value = true
}

const handleLogOut = () => {
  delUser().then((res:any) => {
    if(res.status == 200) {
      uni.showToast({
        title: '账户注销成功',
        icon: 'none',
        mask: true
      })
      user.removeLogin()
      uni.reLaunch({ url: '/components/loginAndRegister/index' })
    }else {
      uni.showToast({
        title: res.message,
        icon: 'error',
        mask: true
      })
    }
  })
}
</script>

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

::v-deep .activeSwitch {
  background-color: unset!important;
  background: $base-background;
}
</style>
