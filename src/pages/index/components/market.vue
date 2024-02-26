<template>
  <view class="mt-5">
    <view>声音市场</view>
    <u-tabs :list="tabsList"></u-tabs>
    <VoiceList :voiceData="voiceData" @handleAudioList="handleAudioList">
      <template #btn>
        <u-button class="customBtn" @click="goGenerate">去制作</u-button>
      </template>
    </VoiceList>
  </view>
</template>

<script setup lang="ts">
import { ref,unref } from "vue";
import VoiceList from "@/components/voiceList/index.vue";
import { VoiceData,HandleAudioParam } from "@/components/voiceList/types"

const tabsList = ref([
  {
    name:'默认'
  },
  {
    name:'我的'
  }
])

const voiceData = ref<VoiceData[]>([
  {audioStatus: 'play'},
  {audioStatus: 'play'},
  {audioStatus: 'play'},
  {audioStatus: 'play'},
  {audioStatus: 'play'}
])

const handleAudioList = ({ activeIndex, audioStatus }:HandleAudioParam) => {
  const index = unref(activeIndex)
  voiceData.value[index].audioStatus = audioStatus
}

const goGenerate = () => {
  uni.switchTab({
    url: '/pages/generate/index'
  })
}
</script>

<style lang="scss" scoped>
::v-deep .u-tabs__wrapper__nav__line {
  bottom: 12rpx;
}
.customBtn {
  background: #4449a3;
  color: #fff;
  height: 60rpx;
  border-radius: 10rpx;
}
</style>