import { storeToRefs } from 'pinia'
import { useGenerateStore } from '@/store/index'
import { ref, watch } from "vue"
import { chat_live, chatReplymsg, chatCopymsg, saveAudio } from "@/api/modules/generate"
import { onLoad } from '@dcloudio/uni-app'
import { testChatError } from "../hooks/config"

type generateModalParam = {
  state: string,
  item?: Recordable,
  index?: number
}

function chunkString(str: string, chunkSize: number) {
  let chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.substr(i, chunkSize));
  }
  return chunks;
}

export const useGenerate = () => {
  const title = ref('')

  const generateStore = useGenerateStore()

  const {
    generateTextStatus,
    textContent,
    textKey,
    textContinueId,
    rolesList,
    textTitle
  } = storeToRefs(generateStore)

  const textContentArr = ref<Recordable[]>([])
  const showGenerateModal = ref(false)
  const generateState = ref('')
  const generateItem = ref<Recordable>({})
  const generateItemIndex = ref(-1)

  watch(generateTextStatus, (newValue) => {
    console.log(newValue, 'backStatus');
    if (newValue) {
      setTimeout(() => {
        if (generateTextStatus.value) {
          updateData()
        }
      }, 100);
    }
  })

  onLoad(() => {
    console.log('load', 1111);
    if (generateTextStatus.value) {
      setTimeout(() => {
        updateData()
      }, 100);
    }
  })

  const updateData = () => {
    textContentArr.value = []
    if (['text', 'video'].includes(textKey.value)) {
      title.value = textTitle.value || '文案'
    }
    handleSliceText()
    generateStore.setTextStatus(false)
  }

  const handleSliceText = () => {
    if (textKey.value == 'text') {
      if (typeof textContent.value !== 'string') return
      const str = JSON.parse(JSON.stringify(textContent.value))
      if(textTitle.value) {
        str.split('\n').map((el: string) => {
          if (el && el.trim()) {
            textContentArr.value.push({
              text: el
            })
          }
        })
      }else {
        textContentArr.value.push({
          text: str
        })
      }
    } else if (textKey.value == 'live') {
      if (typeof textContent.value !== 'string') return
      const str = JSON.parse(JSON.stringify(textContent.value))
      str.split('\n').map((el: any) => {
        let name = ''
        if (el.indexOf(':') !== -1) {
          name = el.slice(0, el.indexOf(':') + 1)
        }
        if (el && el.trim()) {
          textContentArr.value.push({
            text: name ? el.replace(name, '') : el,
            name
          })
        }
      })
    } else if (textKey.value == 'customText') {
      const str = JSON.parse(JSON.stringify(textContent.value))
      // textContentArr.value = chunkString(str, 500).map(el => {
      //   return {
      //     text: el
      //   }
      // })
      textContentArr.value = [{
        text: str
      }]
    } else {
      if (typeof textContent.value !== 'object') return
      textContent.value.map(el => {
        textContentArr.value.push({
          text: el.content,
          name: el.type
        })
      })
    }
    console.log(textContentArr.value, 'mmmmmm')
  }

  const handleContinue = () => {
    if (textContinueId.value !== -1) {
      uni.showLoading({
        title: '生成中',
        mask: true
      })
      const api = textKey.value == 'live' ? chat_live : textKey.value == 'reply' ? chatReplymsg : chatCopymsg
      api({ q_id: textContinueId.value }).then((res: any) => {
        if (res?.message && res?.message == 'error') {
          return uni.showToast({
            title: '生成失败',
            icon: 'error',
            mask: true
          })
        }
        if (testChatError(res.data.data)) {
          return uni.showToast({
            title: `${res.data.data}`,
            icon: 'none',
          })
        }
        generateStore.setTextContent(res.data.data)
        handleSliceText()
      }).finally(() => {
        uni.hideLoading()
      })
    }
  }

  const openGenerateModal = ({ state, item, index }: generateModalParam) => {
    if (!textContentArr.value.length) return uni.showToast({
      title: '请先生成文本',
      icon: 'none',
      mask: true
    })
    showGenerateModal.value = true
    generateState.value = state
    if (item) {
      generateItem.value = item
    }
    if (index !== undefined) {
      generateItemIndex.value = index
    }
  }

  const handleSaveAudio = () => {
    showGenerateModal.value = false
    if (generateState.value == 'delete') {
      textContentArr.value.splice(generateItemIndex.value, 1)
      return
    }
    if (generateState.value == 'reset') {
      generateStore.resetRolesList()
      title.value = ''
      textContentArr.value = []
      generateStore.setTextContinueId(-1)
      generateStore.setTextKey('')
      return
    }
    const param: Recordable = {
      title: title.value,
      Text: []
    }
    if (generateState.value == 'all') {
      textContentArr.value.map(el => {
        const obj = {
          text: el.text,
          name: el.name,
          soundColorId: rolesList.value.length > 1 ? rolesList.value.find(val => el.name.indexOf(val.label) !== -1)?.id : rolesList.value[0].id
        }
        param.Text.push(obj)
      })
    } else {
      if (!generateItem.value) return
      param.Text.push({
        text: generateItem.value.text,
        name: generateItem.value.name,
        soundColorId: rolesList.value.length > 1 ? rolesList.value.find(val => generateItem.value.name.indexOf(val.label) !== -1)?.id : rolesList.value[0].id
      })
    }
    uni.showLoading({
      title: '生成中',
      mask: true
    })
    saveAudio(param).then((res: any) => {
      if (res?.status_code == 304) {
        return uni.showToast({
          title: `${res.message}`,
          icon: 'error',
          mask: true
        })
      }
      if(res?.status_code == 200) {
        uni.showToast({
          title: '生成成功',
          icon: 'success',
          mask: true
        })
      }
    }).catch(() => {
      uni.showToast({
        title: '生成失败',
        icon: 'error',
        mask: true
      })
    }).finally(() => {
      uni.hideLoading()
    })
  }

  const chooseTimbre = (id: number, index: number) => {
    generateStore.setRolesActIndex(index)
    generateStore.setRolesActId(id)
    uni.navigateTo({
      url: '/pages/timbreList/index'
    })
  }

  const handleClearText = () => {
    title.value = ''
  }

  const jumpToCustomText = () => {
    if (!title.value) return uni.showToast({
      title: '请先填写标题',
      icon: 'none'
    })
    uni.navigateTo({
      url: '/pages/generate/customText'
    })
  }

  return {
    textContentArr,
    textContinueId,
    textKey,
    rolesList,
    title,
    showGenerateModal,
    generateState,
    handleContinue,
    handleSaveAudio,
    chooseTimbre,
    handleClearText,
    openGenerateModal,
    jumpToCustomText
  }
}