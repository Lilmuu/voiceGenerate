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
