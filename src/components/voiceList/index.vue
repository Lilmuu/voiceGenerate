<template>
  <view>
    <view h-150 mb-5 class="item bg-#f6f7fa flex items-center pl-5 pr-5 border-rd-10rpx" v-for="(item,index) in voiceData" :key="index">
      <view class="avatar w-90 h-90 border-rd-50% relative bg-contain bg-[url(https://img2.baidu.com/it/u=4064245979,1540381279&fm=253&fmt=auto&app=138&f=JPEG?w=525&h=500)]">
        <view class="w-60 h-60 op-60 bg-#333 border-rd-50% absolute top-0 left-0 bottom-0 right-0 ma-a"></view>
        <u-icon class="absolute top-0 left-0 bottom-0 right-0 ma-a" :name="item.audioStatus == 'play' ? 'play-right-fill' : 'pause'" color="#fff" style="display: table;" @click="handleAudio(index,item.audioStatus)"></u-icon>
      </view>
      <view class="ml-5 flex-1">
        <view class="font-bold">张三</view>
        <view class="font-size-24rpx color-#b5b9c4 mt-2">清新|温和|亲切</view>
      </view>
      <view>
        <slot name="btn"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { useAudio } from "@/hooks/useAudio"
import { VoiceData,HandleAudioParam } from "./types"

defineProps({
  voiceData: {
    type: Array as PropType<VoiceData[]>,
    default: []
  }
})

const emit = defineEmits<{
  (e: 'handleAudioList', {}:HandleAudioParam): void
}>()

const {
  handleAudio
} = useAudio(emit)
</script>

<style lang="scss" scoped>
.item {
  border: 2rpx solid #e4e4ee;
}
</style>