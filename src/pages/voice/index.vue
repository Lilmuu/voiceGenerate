<template>
  <view class="homePage pl-32rpx pr-32rpx" :style="{'height': `${pageHeight}px`}">
    <view class="note"></view>
    <Market></Market>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Market from "./components/market.vue"
const pageHeight = ref(0)

uni.getSystemInfo({
  success: (result) => {
    pageHeight.value = result.screenHeight
  }
})
</script>

<style lang="scss" scoped>
.homePage {
  background: url('@/static/image/homePage/voice_bg.png') no-repeat;
  background-size: 100% 100%;
}
.note {
  height: 640rpx;
}
</style>
