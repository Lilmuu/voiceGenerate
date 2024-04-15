import { computed, onUnmounted, ref } from "vue"
import { PickerColumns,Form,FormRef } from "../types"
import { useGenerateStore } from '@/store/index'

export const useForm = (formData:Form[],labelInfo?:string,editModelInfo?:Recordable) => {
  const generateStore = useGenerateStore()

  const showPicker = ref(false)
  const pickerColumns = ref<PickerColumns[]>([])
  const cusForm = ref<FormRef | null>(null)
  const modelForm = computed(() => {
    const obj:Recordable = {}
    formData.map(val => {
      obj[val.prop] = editModelInfo ? editModelInfo[val.prop] : ''
    })
    return obj
  })

  const handlePicker = (propDatas:PickerColumns[]) => {
    pickerColumns.value = propDatas
    showPicker.value = true
  }

  const pickerConfirm = (e:any,prop:string) => {
    modelForm.value[prop] = e.value[0].label
    showPicker.value = false
  }

  const pickerCancel = () => {
    showPicker.value = false
  }

  const validateForms = () => {
    if(cusForm.value) {
      if(formData.some(el => el.prop == 'script_style')) {
        const result = Promise.resolve(JSON.parse(JSON.stringify(modelForm.value)))
        generateStore.pushValidResult(result)
      }else {
        generateStore.pushValidResult(cusForm.value.validate().then(() => {
          const obj = {
            role:labelInfo,
            ...modelForm.value
          }
          !labelInfo && delete obj.role
          return obj
        }))
      }
    }
  }

  onUnmounted(() => {
    generateStore.clearValidResult()
  })

  return {
    showPicker,
    modelForm,
    pickerColumns,
    cusForm,
    handlePicker,
    pickerCancel,
    pickerConfirm,
    validateForms
  }
}