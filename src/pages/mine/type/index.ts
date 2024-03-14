export interface audioItem {
  audioUrl: string
  id: number
  role: string
  text: string
}

export interface audioList {
  id: number
  title: string
  data: Array<audioItem>
}
// 单个消耗记录
export interface recordItem {
  consumption: number
  id: number
  residual: number
  time: string
}

// 单个充值记录
export interface rechargeItem {
  id: number
  number: string
  time: string
  type: string
}
