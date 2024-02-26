<template>
  <u-swiper :list="list" indicator indicatorMode="dot" circular height="262"></u-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref([
  'https://img0.baidu.com/it/u=1275095085,1961143463&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
  'https://img1.baidu.com/it/u=1699929707,733321099&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
  'https://img1.baidu.com/it/u=1310564963,1641173348&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
])
</script>