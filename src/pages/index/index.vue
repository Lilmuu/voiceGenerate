<template>
  <view class="homePage pl-32rpx pr-32rpx" :style="{'height': `${pageHeight}px`}">
    <view class="h-840rpx"></view>
    <view class="content">
      <image v-for="(item,index) in arr.filter((val,k) => user.userInfo.hide ? k < 3 : val)" :key="index" :src="item.image" class="w-328rpx h-252rpx mb-32rpx" @click="handleEvent(item.key)"/>
    </view>
  </view>
  <u-action-sheet :safeAreaInsetBottom="true" :round="'56rpx'" class="customActionSheet" :actions="sheetList.filter((val,key) => key > 1)" :closeOnClickOverlay="true"
    :closeOnClickAction="false" cancelText="取消" :show="showActionSheet" @select="handleSelect"
    @close="handleSheet(false)"></u-action-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useActionSheet } from "../generate/hooks/useActionSheet"
import { userStore } from '@/store/index'

const user = userStore()
const arr = [
  {
    image: '/static/image/homePage/voice.png',
    key: 'voice'
  },
  {
    image: '/static/image/homePage/live.png',
    key: 'live'
  },
  {
    image: '/static/image/homePage/video.png',
    key: 'video'
  },
  {
    image: '/static/image/homePage/comment.png',
    key: 'comment'
  }
]

const title = ref('文案')
const safeAreaHeight = ref(0)

uni.getSystemInfo({
  success: (result) => {
    if(result.safeArea?.top) {
      safeAreaHeight.value = result.safeArea?.top
    }
  }
})

const {
  showActionSheet,
  sheetList,
  pageHeight,
  handleSelect,
  handleSheet
} = useActionSheet(title)

const handleEvent = (key:string) => {
  if(key == 'voice') {
    uni.switchTab({
      url: '/pages/voice/index'
    })
  }else if (key == 'live') {
    uni.switchTab({
      url: '/pages/generate/index'
    })
  }else if (key == 'video') {
    handleSheet(true)
  }else {
    uni.showToast({
      title: '暂无此功能',
      icon: 'none'
    })
  }
}
</script>

<style lang="scss" scoped>
.homePage {
  background: url('@/static/image/homePage/homePage_bg.png');
  background-size: 100% 100%;
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
::v-deep .customActionSheet {
  font-weight: bold;
  .u-action-sheet__item-wrap__item {
    height: 140rpx;
  }

  .u-line {
    border: 2rpx solid rgba(246, 247, 240, 1) !important;
  }

  .u-action-sheet__cancel-text {
    height: 180rpx;
  }
}
</style>
