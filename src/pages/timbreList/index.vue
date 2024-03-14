<template>
  <u-navbar title="选择音色" :autoBack="true" :placeholder=true></u-navbar>
  <view class="p-20rpx">
    <view class="searchArea">
      <u-search placeholder="输入搜索关键词" v-model="searchValue" bgColor="#f5f6f9" :showAction="false" @focus="searchFocus" @blur="searchConfirm"></u-search>
      <text v-if="searchStatus" @click="searchCancel">取消</text>
    </view>
    <Market ref="market" :homePage="false" :searchStatus="searchStatus"></Market>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Market from "../index/components/market.vue"

const searchValue = ref('')
const searchStatus = ref(false)
const market = ref<InstanceType<typeof Market>>()

const searchFocus = () => {
  searchStatus.value = true
}

const searchCancel = () => {
  searchStatus.value = false
  searchValue.value = ''
  if(market.value) {
    market.value.clearSearchData()
  }
}

const searchConfirm = () => {
  if(!searchValue.value) return 
  if(market.value) {
    market.value.getVoiceList(searchValue.value)
  }
}
</script>

<style lang="scss" scoped>
.searchArea{
  padding: 20rpx 30rpx;
  @include flexCenter();
  font-size: 24rpx;
  >uni-text {
    margin-left: 20rpx;
  }
}
</style>