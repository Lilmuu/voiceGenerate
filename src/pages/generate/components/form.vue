<template>
  <view>
    <u-form :model="modelForm" :rules="rules" labelPosition="left" :labelWidth="formData.length > 1 ? enterpriseState ? '240rpx' : '160rpx' : 'auto'" ref="cusForm">
      <u-form-item v-for="(item, index) in formData" :key="index" :label="item.label" :prop="item.prop" :borderBottom="true" :required="item.required">
        <template v-if="item.type == 'input'">
          <u-input v-model="modelForm[item.prop]" border="none" :placeholder="`请输入${item.label}`"></u-input>
        </template>
        <template v-if="item.type == 'textarea'">
          <u-textarea :maxlength="item.maxlength || -1" :count="item.maxlength ? true : false" border="none" v-model="modelForm[item.prop]" :placeholder="`请输入${item.label}`" :spellcheck="false" :height="item.height || ''"></u-textarea>
        </template>
        <template v-if="item.type == 'radio'">
          <u-radio-group v-model="modelForm[item.prop]" placement="row" activeColor="rgba(189, 254, 3, 1)">
            <u-radio v-for="(val, key) in item.propData" :key="key" :label="val" :name="val">
            </u-radio>
          </u-radio-group>
        </template>
        <template v-if="item.type == 'picker'">
          <text class="mr-3">{{ modelForm[item.prop] }}</text>
          <u-button size="small" class="customBtn" @click="handlePicker(item.propData as PickerColumns[])">选择</u-button>
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
  editModelInfo?: Recordable,
  enterpriseState?: Boolean
}>()

const {
  showPicker,
  modelForm,
  pickerColumns,
  cusForm,
  handlePicker,
  pickerCancel,
  pickerConfirm,
  validateForms,
  resetModelForm
} = useForm(props.formData,props.labelInfo,props.editModelInfo)

defineExpose({validateForms,resetModelForm})
</script>

<style lang="scss" scoped>
.customBtn {
  width: 120rpx;
  height: 62rpx;
  border-radius: 442rpx;
  background: $base-background;
  border: 4rpx solid rgba(213, 255, 150, 1);
  font-weight: bold;
}
::v-deep .u-form-item__body__left__content__label {
  font-size: 28rpx;
}
::v-deep .u-form {
  .u-form-item:nth-last-of-type(1) {
    .u-line {
      border-bottom: unset!important;
    }
  }
  .u-input__content__field-wrapper__field {
    font-size: 28rpx!important;
  }
}
</style>