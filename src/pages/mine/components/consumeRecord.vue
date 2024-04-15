<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { mineApi } from '@/api/index'
import { recordItem } from '../type/index'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const params = ref({
  page_size: 10,
  page: 1
})

// 获取消费记录
const getRecordList = async () => {
  const res = (await mineApi.consumptionList(params.value)) as any
  recordList.value.push(...res.data)
  total.value = res.total
  console.log(res)
}

// 加载更多
const loadMore = () => {
  if (recordList.value.length >= total.value) return
  params.value.page++
  getRecordList()
}

const recordList: Ref<Array<recordItem>> = ref([])

const total = ref(0)

onMounted(() => {
  getRecordList()
})
</script>

<template>
  <view class="record-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="消耗记录"
    >
    </u-navbar>
    <scroll-view
      style="height: calc(100vh - 80rpx)"
      scroll-y="true"
      class="scroll-Y pl-48rpx"
      @scrolltolower="loadMore"
      v-if="recordList && recordList.length"
    >
      <u-cell
        v-for="item in recordList"
        :title="`${item.type}`"
      >
      <template #label>
        <view class="orderTime">{{ `消耗时间:${dayjs(item.time).utc().format('YYYY-MM-DD HH:mm')}` }}</view>
      </template>
      <template #value>
        <view class="orderType">{{ `消耗积分:${item.consumption}` }}</view>
      </template>
    </u-cell>
    </scroll-view>
    <view v-else class="noDatas w-100% h-100vh">
      <image src="@/static/image/homePage/noData.png" class="w-278rpx h-296rpx"/>
      <view class="font-size-28rpx color-#9a9c9e mt-40rpx">暂无数据</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.record-box {
  height: calc(100vh);
  .content-box {
    height: calc(100vh - 40px);
  }
}
::v-deep .u-cell {
  height: 188rpx;
  .u-cell__body {
    height: 100%;
  }
}
.orderTime {
  font-size: 24rpx;
  color: rgba(173, 173, 173, 1);
  margin-top: 16rpx;
}
.orderType {
  padding: 10rpx 26rpx;
  border-radius: 412rpx;
  border: 2rpx solid rgba(0, 0, 0, 1);
  @include flexCenter();
  font-size: 28rpx;
}
</style>
