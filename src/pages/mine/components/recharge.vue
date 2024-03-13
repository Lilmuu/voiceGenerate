<script lang="ts" setup>
import { ref } from 'vue'

const rechargeList = ref([
  {
    title: '￥10',
    integral: 100
  },
  {
    title: '￥30',
    integral: 350
  },
  {
    title: '￥50',
    integral: 600
  },
  {
    title: '￥100',
    integral: 1200
  },
  {
    title: '￥500',
    integral: 7000
  },
  {
    title: '￥1000',
    integral: 15000
  },
  {
    title: '￥3000',
    integral: 50000
  },
  {
    title: '￥10000',
    integral: 200000
  }
])
</script>

<template>
  <view class="recharge-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="充值"
    >
    </u-navbar>
    <view class="content-box pl pr">
      <view
        class="recharge-item"
        v-for="item in rechargeList"
        :key="item.title"
      >
        {{ item.integral }}积分
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.recharge-box {
  height: calc(100vh);
  .content-box {
    height: calc(100vh - 40px);
    .recharge-item {
      width: 100%;
      height: 160rpx;
    }
  }
}
</style>
