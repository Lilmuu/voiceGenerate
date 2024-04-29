<script lang="ts" setup>
import { ref, Ref, unref } from 'vue'
import { onMounted } from 'vue'
import { mineApi } from '@/api/'
import { audioList, audioItem } from '../type/index'
import VoiceList from '@/components/voiceList/index.vue'
import { HandleAudioParam } from '@/components/voiceList/types/index'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import permission from '@/js_sdk/wa-permission/permission.js'
import { useDownLoadToLocal } from "../hooks/downLoad";

dayjs.extend(utc)
const {
  downloadAndSaveMP3,
  downloadForIos
} = useDownLoadToLocal()

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
  const res = (await mineApi.queryAudioList(pageData.value)) as any
  let data = res.data.map((list: any) => {
    list.data = list.data.map((item: audioItem) => {
      return {
        auditionSound: item.audioUrl,
        soundColorId: item.id,
        soundColorInfo: item.text,
        soundColorName: item.role,
        audioStatus: 'play',
        residual: item.residual
      }
    })
    return list
  })
  audioList.value.push(...data)
  // console.log(data)
  total.value = res.total
  // console.log(audioList.value)
}

const validPermission = (permissionID: string) => {
  return new Promise(async (resolve, reject) => {
    const result = await permission.requestAndroidPermission(`android.permission.${permissionID}`)
    if (result == 1) {
      resolve(result)
    } else {
      reject(result)
    }
  })
}

// 下载音频
const downLoadFileAPI = (url: string, title: string) => {
  if(url == '0') return
  const platform = plus.os.name
  const filename = `${title}_${url.substring(url.lastIndexOf('/') + 1)}`
  if (platform === 'Android') {
    Promise.all([validPermission('READ_EXTERNAL_STORAGE'), validPermission('WRITE_EXTERNAL_STORAGE')]).then(res => {
      console.log(res, 'res');
      uni.showLoading({
        title: '下载中',
        mask: true
      })
      uni.request({
        url,
        method: 'GET',
        responseType: 'arrayBuffer',
        success: ({ data }) => {
          const base64 = uni.arrayBufferToBase64(data as ArrayBuffer)
          downloadAndSaveMP3(base64, filename).then((res: any) => {
            uni.hideLoading()
            if (res.fileStatus === 1) {
              return uni.showToast({
                title: `文件已存在，文件路径为：${res.path}`,
                icon: 'none',
                mask: true
              })
            }
            uni.showToast({
              title: `保存成功，文件路径为：${res.path}`,
              icon: 'none',
              mask: true
            })
          }).catch(err => {
            console.log(err, 'err');
            uni.showToast({
              title: '下载失败',
              icon: 'none',
              mask: true
            })
          }).finally(() => {
            uni.hideLoading()
          })
        },
        fail: (error) => { }
      })
    }).catch((err) => {
      console.log(err, 'err');
      uni.showModal({
        title: '无文件读写权限，请打开文件权限',
        content: '',
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            permission.gotoAppPermissionSetting()
          }
        }
      })
    })
  } else {
    downloadForIos(url,filename)
  }
}

const handleAudioList = ({ activeIndex, audioStatus }: HandleAudioParam) => {
  const index = unref(activeIndex)
  audioList.value[openCollapse.value].data[index].audioStatus =
    audioStatus
}

// 加载更多
const loadMore = () => {
  if (audioList.value.length >= total.value) return
  pageData.value.page++
  queryAudioListAPI()
}

onMounted(() => {
  queryAudioListAPI()
})
</script>

<template>
  <view class="audio-box">
    <u-navbar :fixed="false" height="40" :autoBack="true" :is-back="false" :title-bold="true" title="合成列表">
    </u-navbar>
    <scroll-view style="height: calc(100vh - 80rpx)" scroll-y="true" class="scroll-Y pl-48rpx" @scrolltolower="loadMore"
      v-if="audioList && audioList.length">
      <u-collapse @open="changeCollapse" :value="openCollapse" accordion>
        <u-collapse-item v-for="(item, index) in audioList" :key="item.id" :title="item.title"
          :label="`合成时间:${dayjs(item.updatatime).utc().format('YYYY-MM-DD HH:mm')}`" :name="index"
          :class="{ 'activeCollapse': index === openCollapse }">
          <VoiceList :voiceData="item.data" @handleAudioList="handleAudioList">
            <template #btn="{ voiceItemData }">
              <up-button :class="voiceItemData.residual == '1' ? 'customBtnDown' : 'customLoadBtn'" :style="{'width': voiceItemData.residual == '0' ? '150rpx' : voiceItemData.residual == '1' ? '112rpx' : '164rpx'}"
                @click="downLoadFileAPI(voiceItemData.auditionSound, item.title)">{{ voiceItemData.residual == '0' ? '生成中' : voiceItemData.residual == '1' ? '下载' : '生成失败' }}</up-button>
            </template>
          </VoiceList>
        </u-collapse-item>
      </u-collapse>
    </scroll-view>
    <view v-else class="noDatas w-100% h-100vh">
      <image src="@/static/image/homePage/noData.png" class="w-278rpx h-296rpx" />
      <view class="font-size-28rpx color-#9a9c9e mt-40rpx">暂无数据</view>
    </view>
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

::v-deep .u-cell {
  height: 188rpx;

  .u-cell__body {
    height: 100%;
  }

  .u-cell__title {
    font-size: 32rpx;
  }
}

::v-deep .activeCollapse {
  .u-line {
    border-bottom: unset !important;
  }
}

.customBtnDown {
  height: 52rpx;
  border-radius: 444rpx;
  background: $base-background;
}
.customLoadBtn {
  height: 52rpx;
  border-radius: 444rpx;
}
</style>
