<template>
  <view>
    <u-form :model="modelForm" :rules="rules" labelPosition="left" labelWidth="auto" ref="cusForm">
      <u-form-item v-for="(item, index) in formData" :key="index" :label="item.label" :prop="item.prop" :borderBottom="true" :required="item.required">
        <template v-if="item.type == 'input'">
          <u-input v-model="modelForm[item.prop]" border="none"></u-input>
        </template>
        <template v-if="item.type == 'radio'">
          <u-radio-group v-model="modelForm[item.prop]" placement="row">
            <u-radio v-for="(val, key) in item.propData" :key="key" :label="val" :name="val">
            </u-radio>
          </u-radio-group>
        </template>
        <template v-if="item.type == 'picker'">
          <text class="mr-3">{{ modelForm[item.prop] }}</text>
          <u-button type="primary" size="small" class="customBtn" @click="handlePicker(item.propData as PickerColumns[])">选择</u-button>
          <u-picker :show="showPicker" :columns="pickerColumns" keyName="label" @confirm="(e:any) => pickerConfirm(e,item.prop)" @cancel="pickerCancel"></u-picker>
        </template>
      </u-form-item>
    </u-form>
  </view>
</template>

<script setup lang="ts">
import { useForm } from "../hooks/useForm"
import { PickerColumns,Form,FormRules } from "../types"

const props = defineProps<{
  formData: Form[]
  rules: FormRules,
  labelInfo?: string,
  editModelInfo?: Recordable
}>()

const {
  showPicker,
  modelForm,
  pickerColumns,
  cusForm,
  handlePicker,
  pickerCancel,
  pickerConfirm,
  validateForms
} = useForm(props.formData,props.labelInfo,props.editModelInfo)

defineExpose({validateForms})
</script>

<style lang="scss" scoped>
.customBtn {
  width: 100rpx;
}
</style>../hooks/useForm