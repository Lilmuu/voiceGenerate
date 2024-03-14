<template>
  <view class="w-180rpx mr-20rpx overflow-y-auto">
    <view class="listItem" :class="{'activeListItem' : activeItem == index}"  v-for="(item, index) in voiceType" :key="index" @click="handleCheckList(index)">
      <view>{{ item.label }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['handleActiveCate'])

const activeItem = ref(0)
const voiceType = ref([
  {
    label: '方言',
    id: 0
  },
  {
    label: '动画人物',
    id: 1
  },
  {
    label: 'TTS自带',
    id: 2
  },
  {
    label: '声优',
    id: 3
  },
  {
    label: '二次元',
    id: 4
  },
  {
    label: '明星',
    id: 5
  },
  {
    label: '新闻播报',
    id: 6
  },
  {
    label: '主播',
    id: 7
  }
])

const handleCheckList = (index:number) => {
  activeItem.value = index
  emit('handleActiveCate',activeItem.value)
}
</script>

<style lang="scss" scoped>
.listItem{
  height: 80rpx;
  @include flexCenter();
  uni-view {
    width: 100%;
    @include flexCenter();
  }
}
.activeListItem {
  background: #f4f4f5;
  color: #4449a3;
  uni-view {
    border-left: #4449a3 solid 6rpx;
  }
}
</style>