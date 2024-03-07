<script lang="ts" setup></script>

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
    <view class="content-box pl pr"> 充值 </view>
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
