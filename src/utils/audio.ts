import { reactive } from 'vue'

// 定义音频控制参数的接口
interface AudioControlState {
  Audiourl: string
  isPlaying: boolean
  currentAuidoid: string | null | number
}

// 定义 AudioControl 对象的类型，包括其属性和方法
interface AudioControlType {
  controlAudio: AudioControlState
  currentAudioElement: UniApp.InnerAudioContext | null
  addChooseAudio: (id: string | number, audiourl: string) => void
  pauseAudio: () => void
}
export const AudioControl: AudioControlType = {
  // 音频控制参数
  controlAudio: reactive<AudioControlState>({
    // 播放的音频地址
    Audiourl: '',
    // 播放状态
    isPlaying: false,
    // 当前播放的音频id
    currentAuidoid: ''
  }),

  // 选择音频
  addChooseAudio(id, audiourl) {
    if (
      this.controlAudio.Audiourl === audiourl &&
      this.controlAudio.isPlaying
    ) {
      this.pauseAudio()
    } else {
      // 更新当前的播放id、音频地址和播放状态
      this.controlAudio.currentAuidoid = id
      this.controlAudio.Audiourl = audiourl
      this.controlAudio.isPlaying = true

      // 创建一个新的音频元素
      const newAudioElement = uni.createInnerAudioContext()
      newAudioElement.src = audiourl

      // 监听音频结束事件
      newAudioElement.onEnded(() => {
        // 播放结束时，更新播放状态
        this.controlAudio.isPlaying = false
        this.controlAudio.currentAuidoid = null
      })

      // 停止当前正在播放的音频
      if (this.currentAudioElement) {
        this.currentAudioElement.pause()
      }
      // 更新当前正在播放的音频元素
      this.currentAudioElement = newAudioElement
      // 播放新的音频
      this.currentAudioElement.play()
    }
  },

  // 暂停播放
  pauseAudio() {
    if (this.currentAudioElement) {
      // 检查当前正在播放的音频元素是否存在
      this.currentAudioElement.pause()
      this.controlAudio.isPlaying = false
      this.controlAudio.currentAuidoid = null
    }
  },
  currentAudioElement: null
}
