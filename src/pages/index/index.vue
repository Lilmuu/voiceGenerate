<template>
  <view class="index-page">
    <Swiper></Swiper>
    <view class="p-5">
      <view class="mt-2">声音市场</view>
      <Market :homePage="true"></Market>
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
