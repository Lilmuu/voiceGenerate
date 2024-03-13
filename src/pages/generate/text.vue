<template>
  <view>
    <u-navbar title="生成文本" :autoBack="true" :placeholder=true bgColor="#e5e5e5"></u-navbar>
    <view class="p-30rpx">
      <template v-if="['live','reply','video'].includes(textInfo!.key)">
        <u-steps v-if="textInfo?.steps" :current="stepIndex">
          <u-steps-item v-for="(item,index) in textInfo.steps" :key="index" :title="item.label"></u-steps-item>
        </u-steps>
        <template v-if="stepIndex == 0">
          <view v-if="textInfo?.multipleSlect" class="mt-3">身份可以多选，最多选择两项</view>
          <view v-if="textInfo?.selectData" class="mt-5">
            <view v-for="(item,index) in textInfo.selectData" :key="index" @click="handleActiveSelect(index)" class="h-60rpx bg-#f6f7fa border-rd-12rpx mb-5 selectItem" :class="{'activeItem': activeRole.includes(index)}">{{ item.label }}</view>
          </view>
        </template>
        <template v-if="stepIndex == 1">
          <template v-if="textInfo?.key !== 'video'">
            <view class="mt-5 mb-5" v-for="(item,index) in formData" :key="index">
              <view>{{ item.label }}信息：</view>
              <FormList :ref="(el) => getFormItems(el)" :formData="item.form!" :rules="item.rules!" :labelInfo="item.label"></FormList>
            </view>
          </template>
          <template v-else>
            <view class="mt-5 mb-5">
              <view class="h-60rpx bg-#f6f7fa border-rd-12rpx mb-20rpx selectItem" v-for="(item,index) in videoScript" :key="index" :class="{'activeItem': activeVideoItem == index}" @click="handleActiveVideo(index)">
                <view class="videoTextItem">{{ item.script_name }}</view>
              </view>
            </view>
          </template>
        </template>
        <template v-if="[2,3].includes(stepIndex)">
          <template v-if="textInfo?.multipleInfo">
            <view class="mt-5 mb-5">
              <FormList v-if="stepIndex == 2" :ref="(el) => getFormItems(el)" :formData="textInfo?.multipleInfo[0].form!" :rules="textInfo?.multipleInfo[0].rules!"></FormList>
              <view  v-else>
                <u-swipe-action class="mr--30rpx">
                  <u-swipe-action-item
                    :options="productOption"
                    v-for="(val,key) in submitLiveParam.products"
                    :key="key"
                    :index="key"
                    @click="(val:any) => handleSwipeAction(val,key)"
                  >
                  <view class="productItems">
                    <view>产品{{ key + 1 }}</view>
                    <view class="itemName">名称: {{ val[0] || '' }}</view>
                  </view>
                  </u-swipe-action-item>
                </u-swipe-action>
                <view class="addProduct" @click="handleAddProduct">
                  <text>+ 添加一个产品</text>
                </view>
              </view>
            </view>
          </template>
        </template>
      </template>
      <template v-else-if="textInfo?.key == 'text'">
        <view class="mt-5 mb-5">
          <FormList :ref="(el) => getFormItems(el)" :formData="textInfo?.selectData[0].form!" :rules="textInfo?.selectData[0].rules!"></FormList>
        </view>
      </template>
      <u-button type="primary" @click="handleSubmit">确定</u-button>
    </view>
  </view>
  <u-modal :show="editProductStatus" :title="modalStatus == 0 ? '编辑' : '新增'" showCancelButton @cancel="handleModalEdit('cancel')" @confirm="handleModalEdit('confirm')">
    <template v-if="textInfo?.multipleInfo">
      <FormList :ref="(el) => getFormItems(el)" :formData="textInfo?.multipleInfo[1].form!" :rules="textInfo?.multipleInfo[1].rules!" :editModelInfo="editModelInfo"></FormList>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGenerateStore } from '@/store/index'
import { ref } from 'vue'
import { SelectData,VideoScript } from "./types"
import FormList from "./components/form.vue"
import { chatLivemsg,chatReplymsg,chatCopymsg,queryScript } from "@/api/modules/generate"
import { testChatError } from "./hooks/config"

const generateStore = useGenerateStore()

const { textInfo,validResult,audioTitle } = storeToRefs(generateStore)

const stepIndex = ref(0)
const activeRole = ref<number[]>([])
const formData = ref<SelectData[]>([])
const submitLiveParam = ref<Recordable>({
  title: audioTitle.value,
  roles: [],
  enterprise: [],
  products: []
})
const submitReplyParam = ref<Recordable>({
  title: audioTitle.value
})
const submitCopyParam = ref<Recordable>({
  title: audioTitle.value
})
const boxFormItem = ref<InstanceType<typeof FormList>[]>([])
const productOption = ref([
  {
    text: '编辑',
    style: {
      backgroundColor: '#4e96f5'
    }
  },
  {
    text: '删除',
    style: {
      backgroundColor: '#810101'
    }
  }
])
const editProductStatus = ref(false)
const modalStatus = ref(0) 
const swipeActionIndex = ref(0)
const editModelInfo = ref<Recordable>([])
const videoScript = ref<VideoScript[]>([])
const activeVideoItem = ref(-1)

const getFormItems = (el:any) => {
  if(el) {
    if(editProductStatus.value && stepIndex.value == 3) {
      return boxFormItem.value = [el]
    }
    boxFormItem.value.push(el)
  }
}

const handleActiveSelect = (index:number) => {
  if(textInfo.value?.multipleSlect) {
    (activeRole.value.length > 1 && !activeRole.value.includes(index)) && activeRole.value.shift();
    if(activeRole.value.includes(index)) {
      activeRole.value.splice(activeRole.value.findIndex(el => el == index),1)
    }else {
      activeRole.value.push(index)
    }
  }else{
    activeRole.value.splice(0,1,index)
  }
}

const handleActiveVideo = (index:number) => {
  activeVideoItem.value = index
}

const handleSubmit = () => {
  if(textInfo.value?.steps) {
    if(stepIndex.value == 0) {
      if(!activeRole.value.length) return uni.showToast({
        title: `${textInfo.value?.multipleSlect ? '至少选择一项' : '请选择一项'}`,
        icon: 'none'
      })
      textInfo.value.key !== 'video' && activeRole.value.map(el => {
        if(textInfo.value?.selectData) {
          formData.value?.push(textInfo.value?.selectData[el])
        }
      })
      if(textInfo.value.key == 'video') {
        queryScript({script_type: activeRole.value[0] + 1}).then(res => {
          videoScript.value = res.data
          console.log(videoScript.value,'res');
          stepIndex.value++
        })
      }else {
        stepIndex.value++
      }
      return
    }
    if([1,2,3].includes(stepIndex.value) && textInfo.value.key !== 'video') {
      if([1,2].includes(stepIndex.value)) {
        validAllForms(() => {
          if(stepIndex.value == textInfo.value?.steps?.length! - 1) {
            if(textInfo.value?.key == 'reply') {
              getChatText()
            }
          }
        })
      }else {
        if(submitLiveParam.value.products.length == 0) {
          return uni.showToast({
            title: '至少添加一个产品',
            icon: 'none',
          })
        }
        getChatText()
      }
      return
    }
    if(stepIndex.value == 1 && textInfo.value.key == 'video') {
      generateStore.setTextStatus(true)
      generateStore.setTextContent(videoScript.value[activeVideoItem.value].script_content)
      generateStore.setTextKey(textInfo.value?.key!)
      generateStore.clearRolesList()
      generateStore.pushRolesList({
        label: '当前',
        id: 14,
        name: '康辉'
      })
      uni.navigateBack()
      return
    }
  }else {
    if(textInfo.value?.key == 'text') {
      validAllForms(() => {
        getChatText()
      })
    }
  }
}

const getChatText = () => {
  uni.showLoading({
    title: '生成中',
    mask: true
  })
  const api = textInfo.value?.key == 'live' ? chatLivemsg : textInfo.value?.key == 'reply' ? chatReplymsg : chatCopymsg
  const param = textInfo.value?.key == 'live' ? submitLiveParam.value : textInfo.value?.key == 'reply' ? submitReplyParam.value : submitCopyParam.value
  api(param).then((res:any) => {
    if(res?.message == 'error') {
      return uni.showToast({
        title: '生成失败',
        icon: 'error',
        mask: true
      })
    }
    if(res?.data?.data == 'error') {
      return uni.showToast({
        title: '生成失败',
        icon: 'error',
        mask: true
      })
    }
    if(testChatError(res.data.data)) {
      uni.showToast({
        title: `${res.data.data}`,
        icon: 'none',
      })
      stepIndex.value = 0
      formData.value = []
      return
    }
    generateStore.setTextStatus(true)
    generateStore.setTextContent(res.data.data)
    generateStore.setTextContinueId(res.data.id)
    generateStore.setTextKey(textInfo.value?.key!)
    generateStore.clearRolesList()
    if(textInfo.value?.key == 'live') {
      submitLiveParam.value.roles.map((el:any) => {
        if(el[0]) {
          generateStore.pushRolesList({
            label: el[0],
            id: 14,
            name: '康辉'
          })
        }
      })
    }else {
      generateStore.pushRolesList({
        label: '当前',
        id: 14,
        name: '康辉'
      })
    }
    uni.navigateBack()
  }).finally(() => {
    uni.hideLoading()
  })
}

const validAllForms = (callBacks?:() => void) => {
  if(boxFormItem.value) {
    boxFormItem.value.map(el => el.validateForms())
    Promise.all(validResult.value).then((res) => {
      if(textInfo.value?.key == 'live') {
        res.map(el => {
          const arr = []
          for(const key in el) {
            arr.push(el[key] ? el[key] : '无')
          }
          if(el.labelInfo && stepIndex.value == 1) {
            submitLiveParam.value.roles.push(arr)
          }
          if([2,3].includes(stepIndex.value)) {
            if(stepIndex.value == 2) {
              submitLiveParam.value.enterprise = arr
            }else {
              if(modalStatus.value == 0) {
                submitLiveParam.value.products[swipeActionIndex.value] = arr
              }else {
                submitLiveParam.value.products.push(arr)
              }
            }
          }
        })
      }else if(textInfo.value?.key == 'reply') {
        submitReplyParam.value.reply_type = res[0].labelInfo == '产品回复' ? 1 : 2
        submitReplyParam.value.prompt = res[0].replyContent
        submitReplyParam.value.ext_type = res[0].style
      }else {
        submitCopyParam.value.prompt = res[0].textContent
        submitCopyParam.value.copy_style = res[0].style
      }
      callBacks && callBacks()
      textInfo.value?.steps && stepIndex.value < textInfo.value?.steps.length - 1 && stepIndex.value++ && (boxFormItem.value = [])
    }).finally(() => {
      generateStore.clearValidResult()
    })
  }
}

const handleSwipeAction = (val:any,key:number) => {
  swipeActionIndex.value = key
  if(val.index == 0) {
    modalStatus.value = 0
    editModelInfo.value = submitLiveParam.value.products[swipeActionIndex.value]
    editProductStatus.value = true
  }else{
    submitLiveParam.value.products.splice(key,1)
  }
}

const handleAddProduct = () => {
  modalStatus.value = 1
  editProductStatus.value = true
}

const handleModalEdit = (status:string) => {
  if(status == 'confirm') {
    validAllForms(() => {
      editProductStatus.value = false
      console.log(submitLiveParam.value,'finally');
    })
  }else {
    editProductStatus.value = false
  }
  editModelInfo.value = []
}
</script>

<style lang="scss" scoped>
.selectItem {
  @include flexCenter();
  box-sizing: border-box;
}
.activeItem {
  border: 2rpx solid skyblue;
}
.videoTextItem {
  font-size: 26rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.productItems {
  height: 100rpx;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  .itemName {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.u-swipe-action-item {
  border-top: 2rpx solid #b8b7b7;
  &:nth-last-of-type(1) {
    border-bottom: 2rpx solid #b8b7b7;
  }
}
.addProduct {
  height: 80rpx;
  @include flexCenter();
  margin-top: 40rpx;
  border: 2rpx solid #c94545;
  border-radius: 10rpx;
}
</style>