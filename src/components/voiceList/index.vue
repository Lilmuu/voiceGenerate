<template>
  <view class="flex-1">
    <view h-150 class="item mb-20rpx bg-#f6f7fa flex items-center pl-5 pr-5 border-rd-10rpx" v-for="(item,index) in voiceData" :key="index" :style="{'border': !homePage && rolesList[rolesActIndex].id === item.soundColorId ? '2rpx solid skyblue' : ''}">
      <view class="avatar w-90 h-90 border-rd-50% relative bg-cover bg-no-repeat" :style="{'background-image': `url(${item.soundCharacterImage})`}">
        <view class="w-60 h-60 op-60 bg-#333 border-rd-50% absolute top-0 left-0 bottom-0 right-0 ma-a"></view>
        <u-icon class="absolute top-0 left-0 bottom-0 right-0 ma-a" :name="item.audioStatus == 'play' ? 'play-right-fill' : 'pause'" color="#fff" style="display: table;" @click="handleAudio(index,item.audioStatus)"></u-icon>
      </view>
      <view class="ml-5 flex-1 w-120rpx">
        <view class="font-bold textEllipsis">{{ item.soundColorName }}</view>
        <view class="font-size-24rpx color-#b5b9c4 mt-2 textEllipsis">{{ item.soundColorInfo }}</view>
      </view>
      <view>
        <slot name="btn" :voiceItemData="item"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { useAudio } from "@/hooks/useAudio"
import { VoiceData,HandleAudioParam } from "./types"
import { useGenerateStore } from '@/store/index'
import { storeToRefs } from 'pinia'

defineProps({
  voiceData: {
    type: Array as PropType<VoiceData[]>,
    default: []
  },
  homePage: {
    type: Boolean,
    default: true
  }
})

const generateStore = useGenerateStore()
const { 
  rolesActIndex,
  rolesList
} = storeToRefs(generateStore)

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
.textEllipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>