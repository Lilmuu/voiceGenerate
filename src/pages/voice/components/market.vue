<template>
  <view>
    <view class="mb-40rpx ml-16rpx titlesName">声音市场</view>
    <view class="w-686rpx h-384rpx flex lists">
      <view class="flex" v-for="(item, index) in marketList" :key="index"
        @click="handleActiveCate(item.label,item.id, 'default')">
        <image class="w-96rpx h-112rpx" mode="aspectFit" :src="item.url" />
        <view class="font-size-24rpx mt-10rpx">{{ item.label }}</view>
      </view>
    </view>
  </view>
  <view class="mt-56rpx">
    <view class="mb-40rpx ml-16rpx titlesName">我的收藏</view>
    <view class="w-686rpx h-200rpx mineArea">
      <view class="mr-32rpx">
        <image src="@/static/image/homePage/mine.png" class="w-96rpx h-112rpx" mode="aspectFit" />
        <view class="font-size-24rpx color-#7e7f90 flex flex-col flex-items-center">我的Diy</view>
      </view>
      <view class="h-100rpx flex-1 content">
        <view class="font-bold mt-6rpx">独家专利音频技术</view>
        <view class="font-size-24rpx color-#7e7f90 mb-10rpx">打造专属于你的声音</view>
      </view>
      <u-button class="customBtn" @click="handleActiveCate('我的收藏',0, 'mine')">去制作</u-button>
    </view>
  </view>
  <u-popup :show="showAudioList" @close="closePopupBackground" :round="'56rpx'" :safeAreaInsetBottom="false" :zIndex="20000">
    <view class="h-752rpx bg-#fff audioList overflow-y-auto">
      <template v-if="voiceData.length && voiceData.length > 0">
        <view class="mb-10rpx titlesName">{{ popupTitle }}</view>
        <VoiceList ref="voiceList" :voiceData="voiceData" @handleAudioList="handleAudioList">
          <template #btn="{ voiceItemData }">
            <u-button class="customBtn" @click="goGenerate(voiceItemData)">去制作</u-button>
          </template>
        </VoiceList>
      </template>
      <template v-else>
        <NoData></NoData>
      </template>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import VoiceList from "@/components/voiceList/index.vue";
import NoData from "@/components/noData/index.vue";
import { queryTone } from "@/api/modules/generate"
import { VoiceData, HandleAudioParam } from "@/components/voiceList/types"
import { useGenerateStore } from '@/store/index'
import { storeToRefs } from 'pinia'

type QueryVoiceParam = {
  tone_type?: number,
  tone_name?: string,
  user_tone?: number
}

const generateStore = useGenerateStore()
const {
  rolesActIndex,
  rolesList
} = storeToRefs(generateStore)

const showAudioList = ref(false)
const popupTitle = ref('')
const voiceData = ref<VoiceData[]>([])
const marketList = ref([
  {
    label: '主播',
    url: '/static/image/homePage/cate7.png',
    id: 7
  },
  {
    label: '好声音',
    url: '/static/image/homePage/cate3.png',
    id: 5
  },
  {
    label: '方言',
    url: '/static/image/homePage/cate1.png',
    id: 0
  },
  {
    label: 'TTS自带',
    url: '/static/image/homePage/cate6.png',
    id: 2
  },
  {
    label: '动画人物',
    url: '/static/image/homePage/cate4.png',
    id: 1
  },
  {
    label: '声优',
    url: '/static/image/homePage/cate8.png',
    id: 3
  }
])

const handleAudioList = ({ activeIndex, audioStatus }: HandleAudioParam) => {
  const index = unref(activeIndex)
  voiceData.value[index].audioStatus = audioStatus
}

const handleActiveCate = (title:string,id: number, state: string) => {
  popupTitle.value = title
  getVoiceList(id, state)
}

const getVoiceList = async (id: number, state: string) => {
  const param: QueryVoiceParam = {}
  state == 'default' ? (param.tone_type = id) : (param.user_tone = 1)
  const res = await queryTone(param) as any
  const arr = res.message ? res.message.map((el: any) => {
    return {
      ...el,
      audioStatus: 'play'
    }
  }) : []
  voiceData.value = arr
  handlePopup(true)
}

const closePopupBackground = () => {
  handlePopup(false)
}

const handlePopup = (status:boolean,callBack?:any) => {
  if(status) {
    uni.hideTabBar({
      complete: () => {
        showAudioList.value = status
      }
    })
  }else {
    showAudioList.value = status
    uni.showTabBar({
      complete: () => {
        callBack && callBack()
      }
    })
  }
}

const goGenerate = (data: VoiceData) => {
  handlePopup(false,() => {
    generateStore.setRolesList({
      index: rolesList.value && rolesList.value.length > 1 ? rolesActIndex.value : 0,
      id: data.soundColorId,
      name: data.soundColorName,
      image: data.soundCharacterImage
    })
    uni.switchTab({
      url: '/pages/generate/index'
    })
  })
}
</script>

<style lang="scss" scoped>
.lists {
  border-radius: 16rpx;
  background: linear-gradient(180deg, rgba(242, 242, 242, 1) 0%, rgba(255, 255, 255, 1) 100%);
  border: 2rpx solid rgba(255, 255, 255, 1);
  box-shadow: -4rpx -4rpx 14rpx rgba(255, 255, 255, 1), 4rpx 4rpx 14rpx rgba(160, 152, 163, 0.29);
  flex-wrap: wrap;
  padding: 16rpx 32rpx 24rpx;

  >uni-view {
    flex-flow: column;
    align-items: center;
    margin-right: calc((100% - 96rpx * 4) / 3);

    &:nth-of-type(4n) {
      margin-right: 0;
    }

    >uni-view {
      color: rgba(126, 127, 144, 1);
    }
  }
}

.audioList {
  border-radius: 56rpx 56rpx 0 0;
  padding: 0 50rpx 112rpx 50rpx;
  margin-top: 58rpx;
}

.customBtn {
  font-size: 24rpx;
  font-weight: bold;
  padding: 0;
  width: 136rpx;
  height: 64rpx;
  border-radius: 444rpx;
  background: $base-background;
  border: 2rpx solid rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 8rpx  rgba(99, 168, 103, 0.3);

}

.mineArea {
  border-radius: 16rpx;
  background: linear-gradient(180deg, rgba(242, 242, 242, 1) 0%, rgba(255, 255, 255, 1) 100%);
  border: 2rpx solid rgba(255, 255, 255, 1);
  box-shadow: -4rpx -4rpx 14rpx rgba(255, 255, 255, 1), 4rpx 4rpx 14rpx rgba(160, 152, 163, 0.29);
  padding: 16rpx 32rpx 24rpx 32rpx;
  display: flex;
  align-items: center;

  .content {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding-left: 32rpx;
    border-left: 2rpx solid #0000000f;
  }
}
</style>