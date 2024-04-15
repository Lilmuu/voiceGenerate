<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { mineApi } from '@/api/index'
import { rechargeItem } from '../type/index'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const params = ref({
  page_size: 10,
  page: 1
})

const rechargeList: Ref<Array<rechargeItem>> = ref([])

// 获取充值记录
const getRechargeList = async () => {
  const res = (await mineApi.rechargeList(params.value)) as any
  rechargeList.value = res.data
  total.value = res.total
  console.log(res)
}

const loadMore = () => {
  if (rechargeList.value.length >= total.value) {
    params.value.page++
    getRechargeList()
  }
}

const total = ref(0)

onMounted(() => {
  getRechargeList()
})
</script>

<template>
  <view class="recharge-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="充值记录"
      class="font-bold"
    >
    </u-navbar>
    <scroll-view
      style="height: calc(100vh - 80rpx)"
      scroll-y="true"
      class="scroll-Y pl-48rpx"
      @scrolltolower="loadMore"
      v-if="rechargeList && rechargeList.length"
    >
      <u-cell
        v-for="item in rechargeList"
        :key="item.id"
        :title="`充值积分:${item.number}`"
      >
      <template #label>
        <view class="orderTime">{{ `充值时间:${dayjs(item.time).utc().format('YYYY-MM-DD HH:mm')}` }}</view>
      </template>
      <template #value>
        <view class="orderType">{{ `充值类型:${item.type}` }}</view>
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
.recharge-box {
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
