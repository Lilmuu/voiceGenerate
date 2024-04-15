<template>
  <view class="flex-1">
    <view class="flex items-center pr-20rpx voiceItems" v-for="(item, index) in voiceData" :key="index"
      :style="{ 'height': menuStatus ? '200rpx' : '180rpx'}" :class="{'menuItems': menuStatus,'activeMenuItem': item.soundColorId == rolesActId}">
      <view class="avatars w-96rpx h-96rpx border-rd-50% relative">
        <template v-if="item.audioStatus == 'pause'">
          <view class="auidoPlaying1 elCenters"></view>
          <view class="auidoPlaying2 elCenters"></view>
          <view class="auidoPlaying3 elCenters"></view>
        </template>
        <view class="w-90rpx h-90rpx border-rd-50% bg-#fff elCenters">
          <image :src="item.soundCharacterImage" class="w-100% h-100% border-rd-50%" mode="aspectFit" />
        </view>
        <image :src="item.audioStatus == 'play' ? playUrl : pauseUrl" class="w-56rpx h-56rpx elCenters" @click="handleAudio(index,item.audioStatus,item.auditionSound)"/>
      </view>
      <view class="ml-50rpx flex-1 w-120rpx">
        <view class="font-bold textEllipsis mt-6rpx">{{ item.soundColorName }}</view>
        <view class="font-size-24rpx color-#7e7f90 mt-8rpx textEllipsis">{{ item.soundColorInfo }}</view>
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
import { VoiceData, HandleAudioParam } from "./types"
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
  },
  menuStatus: {
    type: Boolean,
    default: false
  }
})

const generateStore = useGenerateStore()
const {
  rolesActId
} = storeToRefs(generateStore)
const playUrl = '/static/image/homePage/play.png'
const pauseUrl = '/static/image/homePage/pause.png'

const emit = defineEmits<{
  (e: 'handleAudioList', { }: HandleAudioParam): void
}>()

const {
  handleAudio,
  resetActiveIndex
} = useAudio(emit)

defineExpose({ resetActiveIndex })
</script>

<style lang="scss" scoped>
.voiceItems {
  border-bottom: 2rpx solid rgba(247, 247, 247, 1);

  &:nth-last-of-type(1) {
    border-bottom: none;
  }
}
.menuItems {
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 16rpx;
  border-bottom: unset;
  padding: 0 32rpx;
}
.activeMenuItem {
  background: url('@/static/image/generate/audioBorder.png') no-repeat;
  background-size: 100% 100%;
}

.textEllipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatars {
  box-shadow: 0rpx 4rpx 8rpx rgba(138, 138, 138, 0.44);
  background-image: linear-gradient(to bottom, rgba(165, 214, 63, 1) 0%, rgba(252, 240, 98, 1) 100%);
}

.elCenters {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.auidoPlaying1,.auidoPlaying2,.auidoPlaying3 {
  @include domSize(100%,100%);
  background-image: linear-gradient(to bottom, rgba(165, 214, 63, 1) 0%, rgba(252, 240, 98, 1) 100%);
  border-radius: 50%;
}
.auidoPlaying1 {
  opacity: 0.5;
  animation: circle1 2s ease-in-out 0s infinite normal forwards;
}
.auidoPlaying2 {
  opacity: 0.25;
  animation: circle2 2s ease-in-out 0s infinite normal forwards;
}
.auidoPlaying3 {
  opacity: 0.1;
  animation: circle3 2s ease-in-out 0s infinite normal forwards;
}
@keyframes circle1 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes circle2 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes circle3 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.45);
  }
  100% {
    transform: scale(1);
  }
}
</style>