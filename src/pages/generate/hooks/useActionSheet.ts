import { Ref, ref } from 'vue';
import { textGenerateList } from "./config"
import { useGenerateStore } from '@/store/index'
import { TextGenerateList } from "../types"

export const useActionSheet = (title:any) => {
  const showActionSheet = ref(false)
  const sheetList = ref(textGenerateList)

  const generateStore = useGenerateStore()

  const handleSheet = (status:boolean) => {
    if(!title.value) return uni.showToast({
      title: '请先填写标题',
      icon: 'none'
    })
    showActionSheet.value = status
  }

  const handleSelect = (val:TextGenerateList) => {
    console.log(val)
    handleSheet(false)
    generateStore.setTextInfo(val)
    generateStore.setAudioTitle(title)
    uni.navigateTo({ url: '/pages/generate/text' })
  }

  return {
    showActionSheet,
    sheetList,
    handleSelect,
    handleSheet
  }
}