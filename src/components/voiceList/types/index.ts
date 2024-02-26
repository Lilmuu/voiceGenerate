import { Ref } from "vue"

export type AudioStauts = 'play' | 'pause'

export type VoiceData = {
  audioStatus:AudioStauts
}

export interface HandleAudioParam {
  activeIndex: Ref<number>,
  audioStatus: AudioStauts
}

export interface HandleAudioList {
  (e: 'handleAudioList', {}:HandleAudioParam): void
}