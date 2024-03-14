import { Ref } from "vue"

export type AudioStauts = 'play' | 'pause'

export type VoiceData = {
  audioStatus:AudioStauts,
  auditionSound: string;
  category: string;
  gender: string;
  soundCharacterImage: string;
  soundColorId: number;
  soundColorInfo: string;
  soundColorName: string;
  soundColorType: string;
}

export interface HandleAudioParam {
  activeIndex: Ref<number>,
  audioStatus: AudioStauts
}

export interface HandleAudioList {
  (e: 'handleAudioList', {}:HandleAudioParam): void
}