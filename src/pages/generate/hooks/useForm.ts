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
    formData.map((val,key) => {
      obj[val.prop] = editModelInfo ? editModelInfo[key] : ''
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
      generateStore.pushValidResult(cusForm.value.validate().then(() => {
        const obj = {
          labelInfo,
          ...modelForm.value
        }
        !labelInfo && delete obj.labelInfo
        return obj
      }))
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