<template>
  <u-navbar :title="policyState == 'user' ? '用户协议' : '隐私协议'" :autoBack="true" :placeholder=true class="font-bold"></u-navbar>
  <view class="w-100% p-10rpx">
    <User v-if="policyState == 'user'"></User>
    <Privacy v-else></Privacy>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import Privacy from "@/static/html/privacy.vue"
import User from "@/static/html/user.vue"

const policyState = ref('')

onLoad((option) => {
  if(option?.key) {
    policyState.value = option.key
  }
})
</script>