<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { onMounted } from 'vue'
import { mineApi } from '@/api/'
import { audioList } from '../type/index'
import { AudioControl } from '@/utils/audio'

const audioList: Ref<Array<audioList>> = ref([])

const total = ref(0)

const pageData = ref({
  page: 1,
  page_size: 10
})

const queryAudioListAPI: () => Promise<void> = async () => {
  const res = await mineApi.queryAudioList(pageData.value)
  audioList.value = res.data
}

// 下载音频
const downLoadFile = (url: string) => {
  uni.downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        console.log('下载成功')
      }
    }
  })
}

onMounted(() => {
  queryAudioListAPI()
})
</script>

<template>
  <view class="audio-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="合成列表"
    >
    </u-navbar>
    <div class="content-box pl pr">
      <u-collapse accordion>
        <u-collapse-item
          v-for="item in audioList"
          :key="item.id"
          :title="item.title"
          :name="item.title"
        >
          <div class="audio-list">
            <div v-for="child in item.data" :key="child.id" class="audio-item">
              <div class="intro-box">
                <div class="title">{{ child.role }}</div>
                <up-text :lines="2" :text="child.text"></up-text>
              </div>
              <div class="btn-box">
                <up-button
                  size="small"
                  class="mr-2"
                  type="success"
                  shape="circle"
                  @click="AudioControl.addChooseAudio(child.id, child.audioUrl)"
                  text="试听"
                ></up-button>
                <up-button
                  size="small"
                  shape="circle"
                  type="primary"
                  text="下载"
                  @click="downLoadFile(child.audioUrl)"
                ></up-button>
              </div>
            </div>
          </div>
        </u-collapse-item>
      </u-collapse>
    </div>
  </view>
</template>

<style lang="scss" scoped>
.audio-box {
  height: 100vh;
  .content-box {
    height: calc(100vh - 40px);
    .audio-list {
      width: 100%;
      .audio-item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20rpx;
        .intro-box {
          width: 55%;
          .title {
            padding-bottom: 10rpx;
          }
        }
        .btn-box {
          display: flex;
          align-items: center;
          width: 45%;
        }
      }
    }
  }
}
</style>
