export type PickerColumns = {
  label: string,
  id: number
}[]

type RuleTrigger = 'change' | 'blur'

interface Rule {
  trigger?: RuleTrigger | RuleTrigger[]
  type?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'array'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
    | 'any'
  required?: boolean
  pattern?: RegExp
  min?: number
  max?: number
  len?: number
  enum?: (string | number)[]
  whitespace?: boolean
  transform?: (value: any) => any
  message?: string
  validator?: (rule: any, value: any, callback: () => any) => boolean
  asyncValidator?: (
    rule: any,
    value: any,
    callback: () => any
  ) => Promise<boolean>
}

export type FormRules = Record<string, Rule | Rule[]>

export declare interface FormRef {
  /**
   * 对整个表单进行校验的方法
   */
  validate: () => Promise<any>
  /**
   * 如果rules中有自定义方法等，需要用此方法设置rules规则
   */
  setRules: (rules: Record<string, Rule | Rule[]>) => any
  /**
   * 对部分表单字段进行校验，回调返回错误，需要自定义后续逻辑
   */
  validateField: () => any
  /**
   * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
   */
  resetFields: () => any
  /**
   * 清空校验结果
   */
  clearValidate: () => any
}

export type Form = {
  label: string,
  prop: string,
  type: string,
  propData?: string[] | PickerColumns[],
  required?: boolean,
  height?: number,
  maxlength?: number
}

export type SelectData = {
  label: string,
  form?: Form[],
  rules?: FormRules,
  image?: string
}

export type FormParamObj = Omit<SelectData,'label'>

export type TextGenerateList = {
  name: string,
  key: TextKey,
  selectData: SelectData[],
  multipleSlect?: Boolean,
  multipleInfo?: SelectData[],
  multipleInfoEntity?: SelectData[],
  scriptStyle?: SelectData[],
  steps?: {
    label:string
  }[]
}

export type TextKey = 'live' | 'reply' | 'text' | 'video' | 'customText' | ''

export interface VideoScript {
  id: number;
  script_content: Scriptcontent[];
  script_name: string;
}

export interface ReplyScript {
  key: string;
  content: string;
}

export interface Scriptcontent {
  content: string;
  type: string;
}