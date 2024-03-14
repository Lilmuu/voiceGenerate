<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { mineApi } from '@/api/index'
import { rechargeItem } from '../type/index'
import dayjs from 'dayjs'
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
    >
    </u-navbar>
    <scroll-view
      style="height: calc(100vh - 80rpx)"
      scroll-y="true"
      class="scroll-Y"
      @scrolltolower="loadMore"
    >
      <u-cell
        v-for="item in rechargeList"
        :key="item.id"
        :title="`充值积分:${item.number}`"
        :value="`充值类型:${item.type}`"
        :label="`充值时间:${dayjs(item.time).format('YYYY-MM-DD HH:mm')}`"
      ></u-cell>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.recharge-box {
  height: calc(100vh);
  .content-box {
    height: calc(100vh - 40px);
  }
}
</style>
