<script lang="ts" setup>
import { ref } from 'vue'
const params = ref({
  pageSize: 10,
  pageNum: 1
})

const orderList = ref([])

const total = ref(0)
</script>

<template>
  <view class="order-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="我的订单"
    >
    </u-navbar>
    <view class="content-box pr pl">
      <u-cell title="单元格" value="内容" label="描述信息"></u-cell>
      <u-cell title="单元格" value="内容" label="描述信息"></u-cell>
      <u-cell title="单元格" value="内容" label="描述信息"></u-cell>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.order-box {
  height: calc(100vh);
  .content-box {
    height: calc(100vh - 40px);
  }
}
</style>
