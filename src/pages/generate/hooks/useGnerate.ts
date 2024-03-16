import { onShow } from "@dcloudio/uni-app"
import { storeToRefs } from 'pinia'
import { useGenerateStore } from '@/store/index'
import { Ref, ref } from "vue"
import { chatLivemsg,chatReplymsg,chatCopymsg,saveAudio } from "@/api/modules/generate"

export const useGenerate = () => {
  const title = ref('')

  const generateStore = useGenerateStore()

  const { 
    generateTextStatus,
    textContent,
    textKey,
    textContinueId,
    rolesList
  } = storeToRefs(generateStore)

  const textContentArr = ref<Recordable[]>([])

  onShow(() => {
    setTimeout(() => {
      if(generateTextStatus.value) {
        textContentArr.value = []
        handleSliceText()
        generateStore.setTextStatus(false)
      }
    }, 10);
  })
  
  const handleSliceText = () => {
    if(textKey.value == 'reply') {
      if(typeof textContent.value !== 'string') return
      textContent.value.split('\n\n').map(el => {
        if(el) {
          textContentArr.value.push({
            // text: el.replace(/\n\n|回复\d+:\s*/g,'')
            text: el
          })
        }
      })
    }else if(textKey.value == 'live') {
      if(typeof textContent.value !== 'string') return
      let str = textContent.value.indexOf('\n\n') !== -1 ? textContent.value.replace(/^.*?\n\n/g,'') : textContent.value
      str.split('\n').map(el => {
        console.log(el.slice(0,el.indexOf('）:') + 2))
        let name = ''
        if(el.indexOf('）:') !== -1) {
          name = el.slice(0,el.indexOf('）:') + 2)
        }
        if(el.indexOf('：') !== -1) {
          name = el.slice(0,el.indexOf('：') + 1)
        }
        textContentArr.value.push({ 
          text: name ? el.replace(name,'') : el,
          name
        })
      })
    }else if(textKey.value == 'text') {
      if(typeof textContent.value !== 'string') return
      const str = JSON.parse(JSON.stringify(textContent.value))
      str.split('\n\n').map((el:string) => {
        if(el) {
          textContentArr.value.push({
            text: el
          })
        }
      })
    }else {
      if(typeof textContent.value !== 'object') return
      textContent.value.map(el => {
        textContentArr.value.push({
          text: el.content,
          name: el.type
        })
      })
    }
    console.log(textContentArr.value,'mmmmmm')
  }

  const handleContinue = () => {
    if(textContinueId.value !== -1) {
      uni.showLoading({
        title: '生成中',
        mask: true
      })
      const api = textKey.value == 'live' ? chatLivemsg : textKey.value == 'reply' ? chatReplymsg : chatCopymsg
      api({q_id:textContinueId.value}).then(res => {
        generateStore.setTextContent(res.data.data)
        handleSliceText()
      }).finally(() => {
        uni.hideLoading()
      })
    }
  }

  const handleSaveAudio = () => {
    if(!textContentArr.value.length) return uni.showToast({
      title: '请先生成文本',
      icon: 'none',
      mask: true
    })
    const param:Recordable = {
      title: title.value,
      Text:[]
    }
    textContentArr.value.map(el => {
      const obj = {
        text: el.text,
        name:el.name,
        soundColorId: rolesList.value.length > 1 ? rolesList.value.find(val => el.name.indexOf(val.label) !== -1)?.id : rolesList.value[0].id
      }
      param.Text.push(obj)
    })
    uni.showLoading({
      title: '生成中',
      mask: true
    })
    saveAudio(param).then(res => {
      console.log(res,'1111111');
      uni.showToast({
        title: '生成成功',
        icon: 'success',
        mask: true
      })
      generateStore.resetRolesList()
      title.value = ''
      textContentArr.value = []
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

  const chooseTimbre = (index:number) => {
    generateStore.setRolesActIndex(index)
    uni.navigateTo({
      url: '/pages/timbreList/index'
    })
  }

  return {
    textContentArr,
    textContinueId,
    textKey,
    rolesList,
    title,
    handleContinue,
    handleSaveAudio,
    chooseTimbre
  }
}