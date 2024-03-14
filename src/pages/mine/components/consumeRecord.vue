<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { mineApi } from '@/api/index'
import { recordItem } from '../type/index'
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
      class="scroll-Y"
      @scrolltolower="loadMore"
    >
      <u-cell
        v-for="item in recordList"
        title="音频合成消耗"
        :value="`消耗积分:${item.consumption}`"
        :label="`剩余积分:${item.residual}`"
      ></u-cell>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.record-box {
  height: calc(100vh);
  .content-box {
    height: calc(100vh - 40px);
  }
}
</style>
