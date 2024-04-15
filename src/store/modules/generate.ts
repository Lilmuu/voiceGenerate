import { defineStore } from 'pinia'
import { Form,TextGenerateList,TextKey,Scriptcontent } from "@/pages/generate/types"
import { queryTone } from "@/api/modules/generate"

type RolesList = {
  label: string,
  id: number,
  name: string,
  image: string
}

type RolesListParam = {
  index: number
} & Partial<RolesList>

interface GenerateState {
  formData: Form[],
  textInfo: TextGenerateList | null,
  validResult: Promise<any>[],
  generateTextStatus: Boolean,
  textContent: string | Scriptcontent[],
  textKey: TextKey,
  audioTitle: string,
  textContinueId: number,
  rolesList: RolesList[],
  defaultRolesList: RolesList[],
  rolesActIndex: number,
  rolesActId: number
}

const useGenerateStore = defineStore('generate', {
  state: ():GenerateState => ({
    formData: [],
    textInfo: null,
    validResult: [],
    generateTextStatus: false,
    textContent:'',
    textKey: '',
    audioTitle: '',
    textContinueId: -1,
    rolesList: [],
    defaultRolesList: [],
    rolesActIndex: -1,
    rolesActId: -1
  }),
  getters: {
    
  },
  actions: {
    setFormData(data:Form[]) {
      this.formData = data
    },
    setTextInfo(obj:TextGenerateList) {
      this.textInfo = obj
    },
    pushValidResult(result:Promise<any>) {
      this.validResult.push(result)
    },
    clearValidResult() {
      this.validResult = []
    },
    setTextStatus(bool:Boolean) {
      this.generateTextStatus = bool
    },
    setTextContent(str:string | Scriptcontent[]) {
      this.textContent = str
    },
    setTextKey(str:TextKey) {
      this.textKey = str
    },
    setAudioTitle(str:string) {
      this.audioTitle = str
    },
    setTextContinueId(id:number) {
      this.textContinueId = id
    },
    setRolesList({index,label,name,id,image}:RolesListParam) {
      label && (this.rolesList[index].label = label)
      name && (this.rolesList[index].name = name)
      id && (this.rolesList[index].id = id)
      image && (this.rolesList[index].image = image)
    },
    clearRolesList() {
      this.resetRolesList()
      this.rolesList.push(JSON.parse(JSON.stringify(this.rolesList[0])))
    },
    pushRolesList(index:number,label:string) {
      this.rolesList[index].label = label
    },
    resetRolesList() {
      this.rolesList = JSON.parse(JSON.stringify(this.defaultRolesList))
    },
    initRolesList(obj:RolesList) {
      this.defaultRolesList = [obj]
    },
    setRolesActIndex(index:number) {
      this.rolesActIndex = index
    },
    setRolesActId(id:number) {
      this.rolesActId = id
    },
    async getDefaultVoice() {
      const res = await queryTone({tone_type: 1}) as any
      if(res.message?.length) {
        this.initRolesList({
          label: '当前',
          name: res.message[0].soundColorName,
          id: res.message[0].soundColorId,
          image: res.message[0].soundCharacterImage
        })
        this.resetRolesList()
      }
    }
  }
})

export default useGenerateStore
