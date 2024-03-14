<template>
  <u-navbar title="选择音色" :autoBack="true" :placeholder=true></u-navbar>
  <view class="p-20rpx">
    <Market :homePage="false"></Market>
  </view>
</template>

<script setup lang="ts">
import Market from "../index/components/market.vue"
</script>