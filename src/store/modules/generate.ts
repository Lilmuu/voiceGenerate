import { defineStore } from 'pinia'
import { Form,TextGenerateList,TextKey,Scriptcontent } from "@/pages/generate/types"

type RolesList = {
  label: string,
  id: number,
  name: string
}

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
  rolesActIndex: number
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
    rolesList:[],
    rolesActIndex: -1
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
    pushRolesList(obj:RolesList) {
      this.rolesList.push(obj)
    },
    setRolesList(obj:RolesList) {
      this.rolesList[this.rolesActIndex] = obj
    },
    clearRolesList() {
      this.rolesList = []
    },
    setRolesActIndex(index:number) {
      this.rolesActIndex = index
    }
  }
})

export default useGenerateStore
