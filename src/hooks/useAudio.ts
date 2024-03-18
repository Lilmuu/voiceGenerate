import { onUnmounted, ref } from "vue"
import { AudioStauts,HandleAudioList } from "@/components/voiceList/types"

type InnerAudioContext = Recordable | null

let innerAudioContext:InnerAudioContext = null

const resetAudio = () => {
  if (innerAudioContext) {
		innerAudioContext.pause();
		innerAudioContext.destroy()
		innerAudioContext = null
	}
}

export const useAudio = (emit?:HandleAudioList) => {
  const activeIndex = ref(-1)

  const resetActiveIndex = () => {
    activeIndex.value = -1
    resetAudio()
  }

  const handleAudio = (index:number,status:AudioStauts,url:string) => {
    if(!emit) return
    if(activeIndex.value != index) {
      const activeLastIndex = JSON.parse(JSON.stringify(activeIndex.value))
      activeIndex.value != -1 && emit('handleAudioList',{activeIndex: activeLastIndex,audioStatus: 'play'})
      activeIndex.value = index
      resetAudio()
      initAudio(url)
    }
    if(!innerAudioContext) return
    status == 'play' ? innerAudioContext.play() : innerAudioContext.pause()
  }

  const initAudio = (audioPath:string) => {
    if(!emit) return
    if (!innerAudioContext) {
      innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = audioPath;
      innerAudioContext.onPlay(() => {
        emit('handleAudioList',{activeIndex,audioStatus: 'pause'})
      })
      innerAudioContext.onPause(() => {
        emit('handleAudioList',{activeIndex,audioStatus: 'play'})
      })
      innerAudioContext.onEnded(() => {
        emit('handleAudioList',{activeIndex,audioStatus: 'play'})
      })
      innerAudioContext.onError((res:Recordable) => {
        console.log(res.errMsg, '播放错误');
        console.log(res.errCode);
      })
    }
  }

  onUnmounted(() => {
    resetAudio()
  })

  return {
    handleAudio,
    resetActiveIndex
  }
}