<template>
  <u-navbar :bgColor="'#fff'" title="导入文案合成" :autoBack="true" :placeholder=true class="font-bold"></u-navbar>
  <view class="p-32rpx">
    <u-textarea class="customText" :maxlength="-1" :border="'none'" v-model="text" placeholder="请输入或粘贴文案"
      :spellcheck="false" :height="'600rpx'"></u-textarea>
    <view class="mt-32rpx font-size-28rpx ml-10rpx">共：{{ text.length }}字</view>
    <u-button class="customBtnSave" text="生成文本" @click="goBack"></u-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGenerateStore } from '@/store/index'

const generateStore = useGenerateStore()

const text = ref('')

const goBack = () => {
  generateStore.setTextStatus(true)
  generateStore.setTextContent(text.value)
  generateStore.setTextKey('customText')
  uni.switchTab({
    url: '/pages/generate/index'
  })
}
</script>

<style lang="scss" scoped>
::v-deep .customText {
  background: rgba(245, 245, 245, 1);
  padding: 24rpx 32rpx;

  .u-textarea__count {
    background: rgba(245, 245, 245, 1) !important;
    margin: 0 16rpx 12rpx;
  }
}

.customBtnSave {
  width: 100%;
  height: 96rpx;
  border-radius: 20rpx;
  color: #000;
  font-weight: bold;
  margin-top: 32rpx;
  background: $base-background;
}
</style>