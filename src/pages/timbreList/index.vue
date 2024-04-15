<template>
  <view class="searchPage">
    <u-navbar :bgColor="'#fff'" title="选择音色" :autoBack="true" :placeholder=true class="font-bold"></u-navbar>
    <view class="p-32rpx">
      <view class="searchArea">
        <u-search placeholder="输入搜索关键词" v-model="searchValue" :searchIconSize="0" :bgColor="'rgba(245, 246, 250, 1)'"
          :palceholderColor="'rgba(194, 195, 209, 1)'" :height="'80rpx'" :showAction="false" @focus="searchFocus"
          @blur="searchConfirm"></u-search>
        <text v-if="searchStatus" class="ml-10rpx w-64rpx font-size-28rpx" @click="searchCancel">取消</text>
        <image v-else src="@/static/image/homePage/search.png" class="ml-10rpx w-64rpx h-64rpx" />
      </view>
      <template v-if="searchStatus">
        <VoiceList v-if="voiceData.length && voiceData.length > 0" ref="voiceList" :voiceData="voiceData" @handleAudioList="handleAudioList">
          <template #btn="{ voiceItemData }">
            <u-button class="customBtn" @click="goGenerate(voiceItemData)">去制作</u-button>
          </template>
        </VoiceList>
        <view v-else class="h-800rpx">
          <NoData></NoData>
        </view>
      </template>
    </view>
    <view v-if="!searchStatus" class="listArea flex" :style="{'height': `calc(100vh - ${menuOffsetTop}px)`}">
      <view class="listLeft w-160rpx">
        <view class="h-128rpx menuItem" :class="{'activeMenu': activeMenu == item.id}" v-for="(item,index) in menuList" :key="index" @click="handleActiveMenu(item.id)">
          <view>{{ item.label }}</view>
        </view>
      </view>
      <view class="listright flex-1 p-16rpx">
        <VoiceList v-if="voiceMenuData.length && voiceMenuData.length > 0" ref="voiceList" :voiceData="voiceMenuData" :menuStatus="true" @handleAudioList="handleAudioList">
          <template #btn="{ voiceItemData }">
            <u-button class="customBtn" @click="goGenerate(voiceItemData)">去制作</u-button>
          </template>
        </VoiceList>
        <NoData v-else></NoData>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from "vue";
import { queryTone } from "@/api/modules/generate"
import VoiceList from "@/components/voiceList/index.vue";
import NoData from "@/components/noData/index.vue";
import { VoiceData, HandleAudioParam } from "@/components/voiceList/types"
import { useGenerateStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const searchValue = ref('')
const searchStatus = ref(false)
const voiceData = ref<VoiceData[]>([])
const voiceMenuData = ref<VoiceData[]>([])

const generateStore = useGenerateStore()
const {
  rolesActIndex,
  rolesList
} = storeToRefs(generateStore)

const activeMenu = ref(7)
const menuList = ref([
  {
    label: '主播',
    id: 7
  },
  {
    label: '好声音',
    id: 5
  },
  {
    label: '方言',
    id: 0
  },
  {
    label: 'TTS自带',
    id: 2
  },
  {
    label: '动画人物',
    id: 1
  },
  {
    label: '声优',
    id: 3
  },
  {
    label: '我的',
    id: 10
  }
])
const menuOffsetTop = ref(0)

const searchFocus = () => {
  searchStatus.value = true
}

const searchCancel = () => {
  searchStatus.value = false
  searchValue.value = ''
  voiceData.value = []
}

const handleAudioList = ({ activeIndex, audioStatus }: HandleAudioParam) => {
  const index = unref(activeIndex)
  searchStatus.value ? voiceData.value[index].audioStatus = audioStatus : voiceMenuData.value[index].audioStatus = audioStatus
}

const goGenerate = (data: VoiceData) => {
  generateStore.setRolesList({
    index: rolesList.value && rolesList.value.length > 1 ? rolesActIndex.value : 0,
    id: data.soundColorId,
    name: data.soundColorName,
    image: data.soundCharacterImage
  })
  uni.switchTab({
    url: '/pages/generate/index'
  })
}

const searchConfirm = () => {
  if (!searchValue.value) return
  getVoiceListData()
}

const handleActiveMenu = (id:number) => {
  activeMenu.value = id
  getVoiceListData()
}

const getVoiceListData = () => {
  const param:Recordable = {}
  if(searchValue.value) {
    param.tone_name = searchValue.value
  }else {
    if(activeMenu.value == 10) {
      param.user_tone = 1
    }else {
      param.tone_type = activeMenu.value
    }
  }
  queryTone(param).then((res: any) => {
    const arr = res.message ? res.message.map((el: any) => {
      return {
        ...el,
        audioStatus: 'play'
      }
    }) : []
    searchValue.value ? (voiceData.value = arr) : (voiceMenuData.value = arr)
  })
}

onMounted(() => {
  uni.createSelectorQuery().select('.listArea').boundingClientRect().exec(res => {
    menuOffsetTop.value = res[0].top
  })
  getVoiceListData()
})
</script>

<style lang="scss" scoped>
.searchPage {
  height: 100vh;

  .searchArea {
    display: flex;
    align-items: center;
  }
}

.customBtn {
  @include domSize(112rpx, 52rpx);
  font-size: 24rpx;
  border-radius: 444rpx;
  background: $base-background;
  box-shadow: 0rpx 4rpx 8rpx rgba(99, 168, 103, 0.3);
  font-weight: bold;
  padding: 0;
}
.listLeft {
  height: 100%;
  overflow-y: scroll;
  .menuItem {
    @include flexCenter();
    font-size: 28rpx;
    color: rgba(126, 127, 144, 1);
  }
}
.activeMenu {
  background: rgba(245, 246, 250, 1);
  position: relative;
  >uni-view::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 8rpx;
    height: 56rpx;
    background: rgba(189, 254, 3, 1);
  }
}
.listright {
  background: rgba(245, 246, 250, 1);
  height: 100%;
  overflow-y: scroll;
}
</style>