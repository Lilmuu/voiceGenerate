<template>
  <view class="noDatas w-100% h-100%">
    <image src="@/static/image/homePage/noData.png" :style="{'height':`${imgHeight}rpx`,'width':`${imgWidth}rpx`}"/>
    <view class="font-size-28rpx color-#9a9c9e mt-40rpx">暂无数据</view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  imgHeight: {
    type: Number,
    default: 278
  },
  imgWidth: {
    type: Number,
    default: 296
  }
})
</script>