<template>
  <view class="index-page">
    <Swiper></Swiper>
    <view class="p-5">
      <view class="widget flex">
        <u-button class="custom-style" type="primary" text="制作"></u-button>
        <u-button class="custom-style" type="primary" text="克隆"></u-button>
      </view>
      <Market></Market>
    </view>
  </view>
</template>

<script setup lang="ts">
import Swiper from "./components/swiper.vue";
import Market from "./components/market.vue";
</script>

<style lang="scss" scoped>
  .custom-style {
    width: 100rpx;
    margin: 0 30rpx 0 0;
  }
</style>
