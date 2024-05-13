<template>
  <u-navbar title="教程" :autoBack="true" :placeholder=true class="font-bold"></u-navbar>
  <u-cell v-for="(item,index) in videoList" :key="index" :title="item.label" @click="handlePlayVideo(item.url)"></u-cell>

  <video v-if="videoUrl" id="video_play" :src="videoUrl" autoplay @play="playVedio" @fullscreenchange="fullscreenchange" class="w-1 h-1"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const videoList = ref([
  {
    label: '短视频生成教学',
    url: `${import.meta.env.VITE_APP_AXIOS_BASE_URL}user/teacging/zbhf.mp4`
  },
  {
    label: '软件功能介绍',
    url: `${import.meta.env.VITE_APP_AXIOS_BASE_URL}user/teacging/rjgn.mp4`
  },
  {
    label: '直播回复脚本生成教学',
    url: `${import.meta.env.VITE_APP_AXIOS_BASE_URL}user/teacging/jbsc.mp4`
  },
  {
    label: '直播脚本生成教学',
    url: `${import.meta.env.VITE_APP_AXIOS_BASE_URL}user/teacging/dspsc.mp4`
  }
])

const videoUrl = ref('')

const handlePlayVideo = (url:string) => {
  videoUrl.value = url
  uni.showLoading({
    title: '加载中',
    mask: true
  })
}

const playVedio = () => {
  uni.hideLoading()
  const videoContext = uni.createVideoContext('video_play', this)
  videoContext.requestFullScreen({direction:0})
}

const fullscreenchange = (e:any) => {
  if(!e.detail.fullScreen) {
    videoUrl.value = ''
  }
}
</script>