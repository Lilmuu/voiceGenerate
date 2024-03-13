<template>
  <view>
    <u-tabs :list="tabsList" @change="handleTabsChange"></u-tabs>
    <view class="flex">
      <Category v-if="activeTabs == 0" @handleActiveCate="handleActiveCate"></Category>
      <VoiceList :homePage="homePage" :voiceData="voiceData" @handleAudioList="handleAudioList">
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
  }
})

const generateStore = useGenerateStore()
const { 
  rolesActIndex,
  rolesList
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
const activeCateIndex = ref(0)
const activeTabs = ref(0)

const handleAudioList = ({ activeIndex, audioStatus }:HandleAudioParam) => {
  const index = unref(activeIndex)
  voiceData.value[index].audioStatus = audioStatus
}

const goGenerate = (data:VoiceData) => {
  console.log(props.homePage,data);
  if(!props.homePage) {
    generateStore.setRolesList({
      label: rolesList.value[rolesActIndex.value].label,
      id: data.soundColorId,
      name: data.soundColorName
    })
  }
  uni.switchTab({
    url: '/pages/generate/index'
  })
}

const handleActiveCate = (index:number) => {
  activeCateIndex.value = index
  getVoiceList()
}

const getVoiceList = async () => {
  const param:QueryVoiceParam = {}
  activeTabs.value == 0 ? (param.tone_type = activeCateIndex.value) : (param.user_tone = activeTabs.value)
  const res = await queryTone(param) as any
  voiceData.value = res.message ? res.message.map((el:any) => {
    return {
      ...el,
      audioStatus: 'play'
    }
  }) : []
}

const handleTabsChange = (val:any) => {
  activeTabs.value = val.index
  getVoiceList()
}

onMounted(() => {
  getVoiceList()
})
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