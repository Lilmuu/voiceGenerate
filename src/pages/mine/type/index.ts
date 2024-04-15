type AudioStauts = 'play' | 'pause'
import { VoiceData } from '@/components/voiceList/types/index'

export interface audioItem {
  audioUrl: string
  id: number
  role: string
  text: string
  audioStatus: AudioStauts
}

export interface audioList {
  id: number
  title: string,
  updatatime: string,
  data: Array<VoiceData>
}
// 单个消耗记录
export interface recordItem {
  consumption: number
  id: number
  residual: number
  time: string,
  type: string
}

// 单个充值记录
export interface rechargeItem {
  id: number
  number: string
  time: string
  type: string
}

export interface ActionList {
  label: string,
  image: string,
  key: string,
  path?: string
}