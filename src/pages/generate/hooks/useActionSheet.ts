import { ref } from 'vue';
import { textGenerateList } from "./config"
import { useGenerateStore } from '@/store/index'
import { TextGenerateList } from "../types"

export const useActionSheet = (title:any) => {
  const showActionSheet = ref(false)
  const sheetList = ref(textGenerateList)
  const pageHeight = ref(0)

  uni.getSystemInfo({
    success: (result) => {
      pageHeight.value = result.screenHeight
    }
  })

  const generateStore = useGenerateStore()

  const handleSheet = (status:boolean,callBack?:any) => {
    if(!title.value) return uni.showToast({
      title: '请先填写标题',
      icon: 'none'
    })
    if(status) {
      uni.hideTabBar({
        complete: () => {
          showActionSheet.value = status
        }
      })
    }else {
      showActionSheet.value = status
      uni.showTabBar({
        complete: () => {
          callBack && callBack()
        }
      })
    }
  }

  const handleSelect = (val:TextGenerateList) => {
    console.log(val)
    handleSheet(false,() => {
      generateStore.setTextInfo(val)
      generateStore.setAudioTitle(title)
      uni.navigateTo({ url: '/pages/generate/text' })
    })
  }

  return {
    showActionSheet,
    sheetList,
    pageHeight,
    handleSelect,
    handleSheet
  }
}