<script lang="ts" setup>
import { ref, Ref, unref } from 'vue'
import { onMounted } from 'vue'
import { mineApi } from '@/api/'
import { audioList, audioItem } from '../type/index'
import VoiceList from '@/components/voiceList/index.vue'
import { HandleAudioParam } from '@/components/voiceList/types/index'

const audioList: Ref<Array<audioList>> = ref([])

const total = ref(0)

const openCollapse = ref(0)

const changeCollapse = (e: number) => {
  openCollapse.value = e
}

const pageData = ref({
  page: 1,
  page_size: 10
})

const queryAudioListAPI: () => Promise<void> = async () => {
  const res = await mineApi.queryAudioList(pageData.value)
  audioList.value = res.data.length
    ? res.data.map((list: any) => {
        list.data = list.data.map((item: audioItem) => {
          return {
            auditionSound: item.audioUrl,
            soundColorId: item.id,
            soundColorInfo: item.text,
            soundColorName: item.role,
            audioStatus: 'play'
          }
        })
        return list
      })
    : []
  console.log(audioList.value)
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

const handleAudioList = ({ activeIndex, audioStatus }: HandleAudioParam) => {
  const index = unref(activeIndex)
  audioList.value[openCollapse.value].data[activeIndex.value].audioStatus =
    audioStatus
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
      <u-collapse @open="changeCollapse" :value="openCollapse" accordion>
        <u-collapse-item
          v-for="(item, index) in audioList"
          :key="item.id"
          :title="item.title"
          :name="index"
        >
          <VoiceList :voiceData="item.data" @handleAudioList="handleAudioList">
            <template #btn="{ voiceItemData }">
              <up-button
                size="small"
                shape="circle"
                type="primary"
                text="下载"
                @click="downLoadFile(voiceItemData.auditionSound)"
              ></up-button>
            </template>
          </VoiceList>
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
