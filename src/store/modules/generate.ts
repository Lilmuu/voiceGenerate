import { defineStore } from 'pinia'
import { Form,TextGenerateList,TextKey,Scriptcontent } from "@/pages/generate/types"

type RolesList = {
  label: string,
  id: number,
  name: string
}

type RolesListParam = {
  index: number,
  prop?: number
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
    rolesList: [],
    defaultRolesList: [],
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
    setRolesList({index,prop,label,name,id}:RolesListParam) {
      console.log(this.rolesList,'zzzzzzzzz');
      
      label && (this.rolesList[index].label = label)
      name && (this.rolesList[index].name = name)
      id && (this.rolesList[index].id = id)
      if(prop && prop == 2 && index == 0) {
        this.rolesList[1] = this.rolesList[0]
      }
      if(!prop) {
        this.rolesList.splice(1,1)
      }
    },
    resetRolesList() {
      this.rolesList = this.defaultRolesList
    },
    initRolesList(obj:RolesList) {
      this.defaultRolesList = [obj]
    },
    setRolesActIndex(index:number) {
      this.rolesActIndex = index
    }
  }
})

export default useGenerateStore
