<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { mineApi } from '@/api/index'
const params = ref({
  page_size: 10,
  page: 1
})

// 获取消费记录
const getRecordList = async () => {
  const res = await mineApi.consumptionList(params.value)
  console.log(res)
}

// 加载更多
const loadMore = () => {
  getRecordList()
}

const recordList = ref([])

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
    <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadMore">
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
