<template>
  <view class="textPage relative">
    <u-navbar title="生成文本" :autoBack="true" :placeholder=true class="font-bold"
      :bgColor="`rgba(255,255,255,${opacity})`"></u-navbar>
    <view class="p-32rpx">
      <view class="progress">
        <u-steps v-if="textInfo?.steps" :current="stepIndex" :dot="true" :inactiveColor="'rgba(194, 195, 201, 1)'">
          <u-steps-item v-for="(item, index) in textInfo.steps" :key="index" :title="item.label" class="customStep"
            :class="{ 'activeStep': stepIndex >= index, 'activeStepLine': stepIndex > index }"></u-steps-item>
        </u-steps>
      </view>
      <template v-if="stepIndex == 0">
        <view v-if="textInfo?.multipleSlect" class="text-center color-#282930 font-bold mb-60rpx">身份可以多选，最多选择两项</view>
        <view v-if="textInfo?.selectData" class="mb-180rpx">
          <view v-for="(item, index) in textInfo.selectData" :key="index" @click="handleActiveSelect(index)"
            class="h-136rpx bg-#f6f7fa border-rd-20rpx mb-48rpx selectItem relative"
            :class="{ 'activeItem': activeRole.includes(index) }">
            {{ item.label }}
            <image v-if="textInfo.key == 'live'" :src="item.image" class="users" />
          </view>
        </view>
      </template>
      <template v-if="stepIndex == 1">
        <template v-if="textInfo?.key == 'live'">
          <view class="contentArea">
            <view class="mb-32rpx p-32rpx formArea" v-for="(item, index) in formData" :key="index">
              <view class="flex flex-items-center">
                <view class="hexagon">
                  <view class="text">{{ item.label.slice(0, 1) }}</view>
                </view>
                <view class="font-bold color-#282930">{{ item.label }}信息：</view>
              </view>
              <FormList :ref="(el) => getFormItems(el)" :formData="item.form!" :rules="item.rules!"
                :labelInfo="item.label"></FormList>
            </view>
          </view>
        </template>
        <template v-if="textInfo?.key == 'text'">
          <view class="contentArea">
            <view class="formArea p-32rpx">
              <FormList :ref="(el) => getFormItems(el)" :formData="textInfo?.selectData[activeRole[0]].form!"
                :rules="textInfo?.selectData[activeRole[0]].rules!"></FormList>
            </view>
            <view v-if="activeRole[0] == 1">
              <u-button class="custom-style-submit" text="洗稿" @click="handleOpenTextModal"></u-button>
            </view>
          </view>
        </template>
        <template v-if="textInfo?.key == 'video'">
          <view class="mt-5 mb-5">
            <view class="h-136rpx bg-#f6f7fa border-rd-20rpx mb-48rpx selectItem" v-for="(item, index) in videoScript"
              :key="index" :class="{ 'activeItem': activeVideoItem == index }" @click="handleActiveVideo(index)">
              <view class="videoTextItem">{{ item.script_name }}</view>
            </view>
          </view>
        </template>
        <template v-if="textInfo?.key == 'reply'">
          <view class="contentArea">
            <view class="mb-40rpx" v-for="(item, index) in replyScript" :key="index">
              <view class="flex mb-16rpx">
                <view class="hexagon">
                  <view class="text">{{ index + 1 }}</view>
                </view>
                <view class="color-#282930 flex-self-center">{{ item.key }}</view>
              </view>
              <editor class="customEditor" placeholder="请输入文本内容" @ready="handleEditorReady(item.content, index)"
                @input="(e: any) => handleEditorInput(e, index)">
              </editor>
              <u-button class="custom-style-submit" text="删除" @click="handleDelReply(index)"></u-button>
            </view>
            <view class="addProduct mb-32rpx" @click="handleOpenReply">
              <text>+ 添加自定义回复</text>
            </view>
          </view>
        </template>
      </template>
      <template v-if="[2, 3, 4].includes(stepIndex)">
        <view class="contentArea">
          <view :class="{ 'formArea': [2, 4].includes(stepIndex), 'p-32rpx': [2, 4].includes(stepIndex) }">
            <view v-if="stepIndex == 2" class="flex flex-items-center">
              <view class="hexagon">
                <view class="text">{{ entityStatus ? '店' : '企' }}</view>
              </view>
              <view class="font-bold color-#282930">{{ entityStatus ? '店铺' : '企业' }}信息：</view>
            </view>
            <FormList v-if="stepIndex == 2 && (textInfo?.multipleInfo && textInfo?.multipleInfoEntity)"
              :ref="(el) => getFormItems(el)"
              :formData="entityStatus ? textInfo?.multipleInfoEntity[0].form! : textInfo?.multipleInfo[0].form!"
              :rules="entityStatus ? textInfo?.multipleInfoEntity[0].rules! : textInfo?.multipleInfo[0].rules!"
              :enterpriseState="true"></FormList>
            <view v-if="stepIndex == 3">
              <view class="productItem flex mb-32rpx" v-for="(val, key) in submitLiveParam.products" :key="key">
                <view class="w-448rpx productBtns">
                  <view class="flex flex-items-center mt-10rpx">
                    <view class="hexagon">
                      <view class="text">{{ key + 1 }}</view>
                    </view>
                    <view class="font-bold color-#282930">产品{{ key + 1 }}</view>
                  </view>
                  <view class="mb-8rpx names">名称：{{ (entityStatus ? val.setMealName : val.name) || '' }}</view>
                </view>
                <view class="productBtns">
                  <u-button class="productBtn" @click="handleSwipeAction('edit', key)">编辑</u-button>
                  <u-button class="productBtn" @click="handleSwipeAction('delete', key)">删除</u-button>
                </view>
              </view>
              <view class="addProduct" @click="handleAddProduct">
                <text>+ 添加一个{{ entityStatus ? '套餐' : '产品' }}</text>
              </view>
            </view>
            <template v-if="stepIndex == 4 && textInfo?.scriptStyle">
              <view>只需填写其中一项</view>
              <FormList :ref="(el) => getFormItems(el)" :formData="textInfo?.scriptStyle[0].form!"
                :rules="textInfo?.scriptStyle[0].rules!" :enterpriseState="true"></FormList>
            </template>
          </view>
        </view>
      </template>

      <view class="fixedBtn">
        <u-button class="customBtns" @click="handleSubmit">确定</u-button>
      </view>
    </view>
  </view>
  <u-modal :show="editProductStatus" :title="modalStatus == 0 ? '编辑' : '新增'" :showConfirmButton="false">
    <view class="w-100%">
      <template v-if="textInfo?.multipleInfo && textInfo.multipleInfoEntity">
        <FormList :ref="(el) => getFormItems(el)"
          :formData="entityStatus ? textInfo?.multipleInfoEntity[1].form! : textInfo?.multipleInfo[1].form!"
          :rules="entityStatus ? textInfo?.multipleInfoEntity[1].rules! : textInfo?.multipleInfo[1].rules!"
          :editModelInfo="editModelInfo"></FormList>
      </template>
      <view class="mt-40rpx">
        <u-button class="modalBtn" @click="handleModalEdit('confirm')">确定</u-button>
        <u-button class="modalBtn" @click="handleModalEdit('cancel')">取消</u-button>
      </view>
    </view>
  </u-modal>
  <u-modal :show="showReplyModal" title="新增" :showConfirmButton="false">
    <view class="w-100%">
      <FormList :ref="(el) => getFormItems(el)" :formData="replyFormObj.form!" :rules="replyFormObj.rules!"></FormList>
      <view class="mt-40rpx">
        <u-button class="modalBtn" @click="handleAddReply">确定</u-button>
        <u-button class="modalBtn" @click="showReplyModal = false">取消</u-button>
      </view>
    </view>
  </u-modal>
  <u-modal :show="showTextModal" :showConfirmButton="false">
    <view class="w-100%">
      <FormList :ref="(el) => getFormItems(el)" :formData="reWriteFormObj.form!" :rules="reWriteFormObj.rules!">
      </FormList>
      <view class="mt-40rpx">
        <u-button class="modalBtn" @click="handleReWriteText">确定</u-button>
        <u-button class="modalBtn" @click="cancelTextModal">取消</u-button>
      </view>
    </view>
  </u-modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGenerateStore } from '@/store/index'
import { ref } from 'vue'
import { SelectData, VideoScript, ReplyScript } from "./types"
import FormList from "./components/form.vue"
import { chat_live, chatReplymsg, chatCopymsg, queryScript, replyQuery } from "@/api/modules/generate"
import { testChatError, replyFormObj, reWriteFormObj } from "./hooks/config"
import { onPageScroll } from '@dcloudio/uni-app'

const generateStore = useGenerateStore()

const { textInfo, validResult, audioTitle } = storeToRefs(generateStore)

const stepIndex = ref(0)
const activeRole = ref<number[]>([])
const formData = ref<SelectData[]>([])
const submitLiveParam = ref<Recordable>({
  title: audioTitle.value,
  roles: [],
  enterprise: [],
  products: [],
  script_style: ''
})
const submitReplyParam = ref<Recordable>({
  title: audioTitle.value
})
const submitCopyParam = ref<Recordable>({
  title: audioTitle.value
})
const boxFormItem = ref<InstanceType<typeof FormList>[]>([])
const editProductStatus = ref(false)
const modalStatus = ref(0)
const swipeActionIndex = ref(0)
const editModelInfo = ref<Recordable>([])
const videoScript = ref<VideoScript[]>([])
const replyScript = ref<ReplyScript[]>([])
const initialReplyScript = ref<ReplyScript[]>([])
const activeVideoItem = ref(-1)
const entityStatus = ref(false)
const showReplyModal = ref(false)
const opacity = ref(0)
const showTextModal = ref(false)

const getFormItems = (el: any) => {
  if (el) {
    if ((editProductStatus.value && stepIndex.value == 3) || textInfo.value?.key == 'reply') {
      return boxFormItem.value = [el]
    }
    if (textInfo.value?.key == 'text' && activeRole.value[0] == 1 && showTextModal.value) {
      return boxFormItem.value[1] = el
    }
    if (textInfo.value?.key == 'text' && activeRole.value[0] == 1 && boxFormItem.value.length) return
    boxFormItem.value.push(el)
  }
}

const handleActiveSelect = (index: number) => {
  if (textInfo.value?.multipleSlect) {
    (activeRole.value.length > 1 && !activeRole.value.includes(index)) && activeRole.value.shift();
    if (activeRole.value.includes(index)) {
      activeRole.value.splice(activeRole.value.findIndex(el => el == index), 1)
    } else {
      activeRole.value.push(index)
    }
  } else {
    activeRole.value.splice(0, 1, index)
  }
}

const handleActiveVideo = (index: number) => {
  activeVideoItem.value = index
}

const handleSubmit = () => {
  if (textInfo.value?.steps) {
    if (stepIndex.value == 0) {
      if (!activeRole.value.length) return uni.showToast({
        title: `${textInfo.value?.multipleSlect ? '至少选择一项' : '请选择一项'}`,
        icon: 'none'
      })
      textInfo.value.key == 'live' && activeRole.value.map(el => {
        if (textInfo.value?.selectData) {
          formData.value?.push(textInfo.value?.selectData[el])
        }
      })
      if (textInfo.value.key == 'video') {
        queryScript({ script_type: activeRole.value[0] + 1 }).then(res => {
          videoScript.value = res.data
          stepIndex.value++
        })
      } else if (textInfo.value.key == 'reply') {
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        replyQuery({ reply_type: `10${activeRole.value[0] + 1}` }).then(res => {
          const reg = /\((.+?)\)/g
          initialReplyScript.value = res.data
          replyScript.value = res.data.map((val: ReplyScript) => {
            const obj = JSON.parse(JSON.stringify(val))
            obj.content = obj.content.replace(/（/g, '(').replace(/）/g, ')').replace(reg, (match: any) => {
              const str = `<span style="color: red">${match}</span>`
              return str
            })
            return obj
          })
          stepIndex.value++
        }).finally(() => {
          uni.hideLoading()
        })
      } else {
        stepIndex.value++
      }
      return
    }
    if ([1, 2, 3, 4].includes(stepIndex.value) && ['live', 'text'].includes(textInfo.value.key)) {
      if ([1, 2].includes(stepIndex.value)) {
        validAllForms(() => {
          if (textInfo.value?.key == 'text' && activeRole.value[0] == 0) {
            getChatText()
          }
          if (textInfo.value?.key == 'text' && activeRole.value[0] == 1) {
            if (showTextModal.value) return
            generateStore.setTextStatus(true)
            generateStore.setTextContent(submitCopyParam.value.copy_describe)
            generateStore.setTextKey(textInfo.value?.key!)
            generateStore.setTextContinueId(-1)
            generateStore.resetRolesList()
            generateStore.setRolesList({
              index: 0,
              label: '当前'
            })
            generateStore.clearValidResult()
            uni.switchTab({
              url: '/pages/generate/index'
            })
            return
          }
        })
      } else {
        if (stepIndex.value == 3) {

          if (submitLiveParam.value.products.length == 0) {
            return uni.showToast({
              title: `至少添加一个${entityStatus.value ? '套餐' : '产品'}`,
              icon: 'none',
            })
          }
          boxFormItem.value = []
          stepIndex.value++
        } else {
          validAllForms(() => {
            getChatText()
          })
        }
      }
      return
    }
    if (stepIndex.value == 1 && ['reply', 'video'].includes(textInfo.value.key)) {
      generateStore.setTextStatus(true)
      generateStore.setTextContent(textInfo.value.key == 'video' ? videoScript.value[activeVideoItem.value].script_content : initialReplyScript.value.map(el => {
        return {
          type: el.key,
          content: el.content
        }
      }))
      generateStore.setTextKey(textInfo.value?.key!)
      generateStore.setTextContinueId(-1)
      generateStore.resetRolesList()
      generateStore.setRolesList({
        index: 0,
        label: '当前'
      })
      uni.switchTab({
        url: '/pages/generate/index'
      })
      return
    }
  }
}

const filterObj = (obj: any) => {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
    if (typeof obj[key] == 'object') {
      filterObj(obj[key])
    }
  }
}

const captrueExceptions = (res: any) => {
  let bool = false
  if (res?.message == 'error') {
    uni.showToast({
      title: '生成失败',
      icon: 'error',
      mask: true
    })
    bool = true
  }else if (res?.data?.data == 'error') {
    uni.showToast({
      title: '生成失败',
      icon: 'error',
      mask: true
    })
    bool = true
  }else if (testChatError(res.data.data)) {
    uni.showToast({
      title: `${res.data.data}`,
      icon: 'none',
    })
    // stepIndex.value = 0
    // formData.value = []
    // submitLiveParam.value.products = []
    // submitLiveParam.value.roles = []
    // submitLiveParam.value.enterprise = []
    bool = true
  }else if (res.status == 300) {
    uni.showToast({
      title: `${res.message}`,
      icon: 'error',
      mask: true
    })
    bool = true
  }
  return bool
}

const getChatText = () => {
  uni.showLoading({
    title: '生成中',
    mask: true
  })
  const api = textInfo.value?.key == 'live' ? chat_live : textInfo.value?.key == 'reply' ? chatReplymsg : chatCopymsg
  let param = {}
  if (textInfo.value?.key == 'live') {
    const obj = JSON.parse(JSON.stringify(submitLiveParam.value))
    if (entityStatus.value) {
      obj.shope = {
        name: obj.enterprise.shopName,
        indnstry: obj.enterprise.shopIndnstry,
        address: obj.enterprise.shopAddress
      }
      obj.set_meal = obj.products.map((el: any, key: number) => {
        return {
          name: el.setMealName,
          url_txt: `${key + 1}号`,
          described: el.setMealDescribe,
          price: el.setMealPrice,
          discount: el.setMealDiscount
        }
      })
      delete obj.enterprise
      delete obj.products
    }
    if (obj.script_style == '常规') {
      delete obj.script_style
    }
    param = obj
  } else if (textInfo.value?.key == 'reply') {
    param = submitReplyParam.value
  } else {
    param = submitCopyParam.value
  }
  filterObj(param)
  api(param).then((res: any) => {
    if(captrueExceptions(res)) return
    generateStore.setTextStatus(true)
    generateStore.setTextContent(res.data.data)
    generateStore.setTextContinueId(res.data.id)
    generateStore.setTextKey(textInfo.value?.key!)
    if (textInfo.value?.key == 'live' && submitLiveParam.value.roles.length > 1) {
      generateStore.clearRolesList()
      submitLiveParam.value.roles.map((el: any, key: number) => {
        if (el.role) {
          generateStore.pushRolesList(key, el.role)
        }
      })
    } else {
      generateStore.resetRolesList()
      generateStore.setRolesList({
        index: 0,
        label: '当前'
      })
    }
    if (submitCopyParam.value.copy_title) {
      generateStore.setTextTitle(submitCopyParam.value.copy_title)
    }
    uni.switchTab({
      url: '/pages/generate/index'
    })
  }).finally(() => {
    uni.hideLoading()
  })
}

const validAllForms = (callBacks?: () => void) => {
  if (boxFormItem.value) {
    boxFormItem.value.map(el => el.validateForms())
    Promise.all(validResult.value).then((res) => {
      if (textInfo.value?.key == 'live') {
        res.map(el => {
          for (const key in el) {
            if (el[key] == '本地生活') {
              entityStatus.value = true
            }
          }
          if (el.role && stepIndex.value == 1) {
            submitLiveParam.value.roles.push(el)
          }
          if ([2, 3].includes(stepIndex.value)) {
            if (stepIndex.value == 2) {
              submitLiveParam.value.enterprise = el
            } else {
              if (modalStatus.value == 0) {
                submitLiveParam.value.products[swipeActionIndex.value] = el
              } else {
                submitLiveParam.value.products.push(el)
              }
            }
          }
        })
        if (stepIndex.value == 4) {
          let bool = false
          for (const key in res[0]) {
            if (res[0][key]) {
              bool = true
            }
          }
          if (!bool) {
            return uni.showToast({
              title: '至少填写一项',
              icon: 'none'
            })
          }
          if (res[0].customScriptStyle) {
            submitLiveParam.value.script_style = res[0].customScriptStyle
          } else {
            submitLiveParam.value.script_style = res[0].script_style
          }
        }
      } else if (textInfo.value?.key == 'reply') {
        initialReplyScript.value.push({
          key: `关键词${res[0].key}`,
          content: res[0].content
        })
        replyScript.value.push({
          key: `关键词${res[0].key}`,
          content: res[0].content
        })
      } else {
        submitCopyParam.value.copy_describe = res[0].textDescribe
        if (activeRole.value[0] == 0) {
          if (!res[0].style && !res[0].customStyle) return uni.showToast({
            title: '文案风格与自定义风格至少填写一项',
            icon: 'none',
            mask: true
          })
          submitCopyParam.value.title = res[0].textContent
          submitCopyParam.value.copy_title = res[0].textContent
          submitCopyParam.value.copy_style = res[0].customStyle ? res[0].customStyle : res[0].style
          if (!res[0].customStyle && res[0].style == '常规') {
            delete submitCopyParam.value.copy_style
          }
        } else {
          if (showTextModal.value) {
            submitCopyParam.value.prompt = res[1].prompt
          }
        }
      }
      callBacks && callBacks()
      textInfo.value?.steps && stepIndex.value !== 3 && stepIndex.value < textInfo.value?.steps.length - 1 && stepIndex.value++ && (boxFormItem.value = [])
    }).finally(() => {
      generateStore.clearValidResult()
    })
  }
}

const handleSwipeAction = (status: string, key: number) => {
  swipeActionIndex.value = key
  if (status == 'edit') {
    modalStatus.value = 0
    editModelInfo.value = submitLiveParam.value.products[swipeActionIndex.value]
    editProductStatus.value = true
  } else {
    submitLiveParam.value.products.splice(key, 1)
  }
}

const handleAddProduct = () => {
  modalStatus.value = 1
  editProductStatus.value = true
}

const handleModalEdit = (status: string) => {
  if (status == 'confirm') {
    validAllForms(() => {
      editProductStatus.value = false
    })
  } else {
    editProductStatus.value = false
  }
  editModelInfo.value = []
}

const handleEditorReady = (content: string, index: number) => {
  setTimeout(() => {
    uni.createSelectorQuery().selectAll('.customEditor').context((res: any) => {
      let con = res[index].context
      con.setContents({
        html: content
      })
    }).exec()
  });
}

const handleEditorInput = (e: any, index: number) => {
  initialReplyScript.value[index].content = e.detail.text
}

const handleOpenReply = () => {
  showReplyModal.value = true
}

const handleAddReply = () => {
  validAllForms(() => {
    showReplyModal.value = false
    boxFormItem.value = []
  })
}

const handleDelReply = (index: number) => {
  initialReplyScript.value.splice(index, 1)
  replyScript.value.splice(index, 1)
}

const handleOpenTextModal = () => {
  validAllForms(() => {
    showTextModal.value = true
  })
}

const handleReWriteText = () => {
  validAllForms(() => {
    uni.showLoading({
      title: '生成中',
      mask: true
    })
    chatCopymsg(submitCopyParam.value).then(res => {
      if(captrueExceptions(res)) return
      boxFormItem.value[0].resetModelForm('textDescribe',res.data.data)
      cancelTextModal()
    }).finally(() => {
      uni.hideLoading()
    })
  })
}

const cancelTextModal = () => {
  showTextModal.value = false
  boxFormItem.value.splice(1)
}

onPageScroll(e => {
  const scrollTop = e.scrollTop
  opacity.value = scrollTop > 200 ? 1 : scrollTop / 200
})
</script>

<style lang="scss" scoped>
.textPage {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(223, 254, 155, 1) 0%, rgba(245, 250, 234, 1) 100%);
}

.selectItem {
  @include flexCenter();
}

.activeItem {
  background: rgba(182, 239, 18, 1);
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

.productItem {
  height: 188rpx;
  padding: 24rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 8rpx 16rpx rgba(0, 0, 0, 0.04);
  justify-content: space-between;

  .names {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .productBtns {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }

  .productBtn {
    width: 120rpx;
    height: 62rpx;
    border-radius: 442rpx;
    background: rgba(32, 32, 40, 1);
    font-size: 28rpx;
    color: #fff;

    &:nth-of-type(2) {
      background: rgba(244, 245, 248, 1);
      color: rgba(32, 32, 40, 1);
    }
  }
}

.addProduct {
  height: 96rpx;
  @include flexCenter();
  background: url('@/static/image/generate/addBtn.png') no-repeat;
  background-size: 100% 100%;
}

::v-deep .activeStep {
  .u-steps-item__wrapper__dot {
    background: $base-background !important;
  }
}

::v-deep .activeStepLine {
  .u-steps-item__line--row {
    background: $base-background !important;
  }
}

.progress {
  background: #fff;
  padding: 48rpx 0;
  border-radius: 16rpx;
  margin-bottom: 16rpx;
}

::v-deep .customStep {
  flex-direction: column-reverse !important;

  .u-text__value--content,
  .u-text__value--main {
    font-size: 24rpx !important;
    color: rgba(11, 11, 11, 0.5);
    width: 96rpx;
    height: 86rpx;
    text-align: center;
  }

  .u-text__value--main {
    color: rgba(11, 11, 11, 1);
  }

  .u-steps-item__line--row {
    top: unset;
    bottom: 10px;
  }
}

.contentArea {
  padding-bottom: 200rpx;
}

.users {
  @include domSize(160rpx, 160rpx);
  position: absolute;
  right: 48rpx;
  bottom: 0;
}

.fixedBtn {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 80rpx 32rpx;
  width: 100%;

  .customBtns {
    height: 96rpx;
    color: #fff;
    border-radius: 48rpx;
    background: rgba(31, 31, 41, 1);
  }
}

.formArea {
  box-shadow: 0rpx 8rpx 16rpx rgba(0, 0, 0, 0.04);
  border-radius: 16rpx;
  background: #fff;
}

.hexagon {
  position: relative;
  @include domSize(42rpx, 48rpx);
  background: url('@/static/image/generate/hexagon.png') no-repeat;
  background-size: 100% 100%;
  @include flexCenter();
  margin-right: 16rpx;

  .text {
    font-size: 24rpx;
    font-weight: bold;
  }
}

.customEditor {
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 1);
  padding: 32rpx;
}

.ql-container {
  height: auto;
  min-height: unset;
}

.custom-style-submit {
  width: 326rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background: $base-background;
  margin: 20rpx 0 0;
}
</style>