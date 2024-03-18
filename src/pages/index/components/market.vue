<template>
  <view>
    <u-tabs :current="activeTabs" v-if="!searchStatus" :list="tabsList" @change="handleTabsChange"></u-tabs>
    <view class="flex">
      <Category :activeCateIndex="activeCateIndex" v-if="activeTabs == 0 && !searchStatus" @handleActiveCate="handleActiveCate"></Category>
      <VoiceList ref="voiceList" :homePage="homePage" :voiceData="searchStatus ? searchVoiceData : voiceData" @handleAudioList="handleAudioList">
        <template #btn="{ voiceItemData }">
          <u-button class="customBtn" @click="goGenerate(voiceItemData)">{{ homePage ? '去制作' : '使用'}}</u-button>
        </template>
      </VoiceList>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref,unref,onMounted } from "vue";
import VoiceList from "@/components/voiceList/index.vue";
import Category from "@/components/category/index.vue";
import { VoiceData,HandleAudioParam } from "@/components/voiceList/types"
import { queryTone } from "@/api/modules/generate"
import { useGenerateStore } from '@/store/index'
import { storeToRefs } from 'pinia'

type QueryVoiceParam = {
  tone_type?: number,
  tone_name?: string,
  user_tone?: number
}

const props = defineProps({
  homePage: {
    type: Boolean,
    default: true
  },
  searchStatus: {
    type: Boolean,
    default: false
  }
})

const generateStore = useGenerateStore()
const {
  rolesActIndex
} = storeToRefs(generateStore)

const tabsList = ref([
  {
    name:'默认'
  },
  {
    name:'我的'
  }
])

const voiceData = ref<VoiceData[]>([])
const searchVoiceData = ref<VoiceData[]>([])
const activeCateIndex = ref(0)
const activeTabs = ref(0)
const voiceList = ref<InstanceType<typeof VoiceList>>()

const handleAudioList = ({ activeIndex, audioStatus }:HandleAudioParam) => {
  const index = unref(activeIndex)
  voiceData.value[index].audioStatus = audioStatus
}

const goGenerate = (data:VoiceData) => {
  console.log(data,'1');
  
  generateStore.setRolesList({
    index: props.homePage ? 0 : rolesActIndex.value,
    id: data.soundColorId,
    name: data.soundColorName
  })
  uni.switchTab({
    url: '/pages/generate/index'
  })
}

const handleActiveCate = (index:number) => {
  if(activeCateIndex.value !== index && voiceList.value) {
    voiceList.value.resetActiveIndex()
  }
  activeCateIndex.value = index
  getVoiceList()
}

const getVoiceList = async (val?: string) => {
  const param:QueryVoiceParam = {}
  val && (param.tone_name = val)
  !val && activeTabs.value == 0 ? (param.tone_type = activeCateIndex.value) : (param.user_tone = activeTabs.value)
  const res = await queryTone(param) as any
  const arr = res.message ? res.message.map((el:any) => {
    return {
      ...el,
      audioStatus: 'play'
    }
  }) : []
  val ? searchVoiceData.value = arr : voiceData.value = arr
}

const getDefaultVoice = async () => {
  const res = await queryTone({tone_type: 1}) as any
  if(res.message?.length) {
    generateStore.initRolesList({
      label: '当前',
      name: res.message[0].soundColorName,
      id: res.message[0].soundColorId
    })
    generateStore.resetRolesList()
  }
}

const clearSearchData = () => {
  searchVoiceData.value = []
}

const handleTabsChange = (val:any) => {
  if(activeTabs.value !== val.index && voiceList.value) {
    voiceList.value.resetActiveIndex()
  }
  activeTabs.value = val.index
  getVoiceList()
}

onMounted(() => {
  getVoiceList()
  getDefaultVoice()
})

defineExpose({getVoiceList,clearSearchData})
</script>

<style lang="scss" scoped>
::v-deep .u-tabs__wrapper__nav__line {
  bottom: 12rpx;
}
.customBtn {
  background: #4449a3;
  color: #fff;
  height: 60rpx;
  border-radius: 10rpx;
}
</style>