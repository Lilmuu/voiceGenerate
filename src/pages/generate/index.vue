<template>
  <view v-if="!textKey" class="h-564rpx robot relative">
    <image src="@/static/image/generate/robot.png" />
    <view class="h-256rpx text">
      <view>Hi~ 输入文本内容即可生成音频，快来体验一下吧！</view>
    </view>
  </view>
  <view class="pl-32rpx pr-32rpx pb-40rpx" :style="{'margin-top': !textKey ? '0' : `${safeAreaHeight}px`}">
    <view class="mb-16rpx titlesName" :class="textKey ? 'mt-32rpx' : 'mt-8rpx'">填写标题</view>
    <view v-if="!textKey" class="color-#7e7f90 font-size-24rpx mb-32rpx">填写标题更好的标注生成内容</view>
    <view class="relative" :class="textKey ? 'mb-20rpx' : 'mb-72rpx'">
      <u-textarea class="customText" :maxlength="20" :count="true" :border="'none'" v-model="title"
        placeholder="请输入标题，20字内" :spellcheck="false" :height="textKey ? '96rpx' : '396rpx'"></u-textarea>
      <view class="clearText" @click="handleClearText">清空</view>
    </view>
    <u-button class="customBtnSave" text="生成文本" @click="handleSheet(true)"></u-button>
    <u-button v-if="!textKey" class="customBtnText" text="导入文案合成" @click="jumpToCustomText"></u-button>
    <template v-if="textKey">
      <view class="font-size-28rpx mt-26rpx mb-32rpx h-68rpx rolesListItem" v-for="(item, index) in rolesList" :key="index"
        @click="chooseTimbre(item.id,index)">
        <image src="@/static/image/generate/musical.png" class="w-34rpx h-42rpx mr-16rpx"/>
        <text class="mr-16rpx">{{ item.label }}音色：</text>
        <image class="w-38rpx h-38rpx border-rd-50% mr-16rpx" :src="item.image" />
        <text class="mr-16rpx">{{ item.name }}</text>
        <u-icon name="arrow-down" size="16"></u-icon>
      </view>
      <view v-for="(item, index) in textContentArr" :key="index">
        <view v-if="item.name" class="mb-20rpx titlesName">{{ item.name }}</view>
        <view class="relative">
          <u-textarea :maxlength="-1" v-model="item.text" placeholder="请输入内容" :spellcheck="false"
            :autoHeight="true"></u-textarea>
          <image src="@/static/image/generate/edit.png" class="textAreaEdit" />
        </view>
        <view class="cusSubArea">
          <u-button class="custom-style-submit" text="保存单个音频"
            @click="openGenerateModal({state: 'single',item})"></u-button>
          <u-button class="custom-style-delete" text="删除"
            @click="openGenerateModal({state: 'delete',index})"></u-button>
        </view>
      </view>
      <u-button v-if="textContinueId !== -1" class="custom-style" text="继续生成" @click="handleContinue"></u-button>
      <u-button class="custom-style-submit-all" text="保存全部"
        @click="openGenerateModal({state: 'all'})"></u-button>
      <u-button class="custom-style-reset" text="重置"
        @click="openGenerateModal({state: 'reset'})"></u-button>
    </template>
  </view>
  <u-action-sheet :round="'56rpx'" class="customActionSheet" :actions="sheetList.filter((val,key) => key < 2)" :closeOnClickOverlay="true"
    :closeOnClickAction="false" cancelText="取消" :show="showActionSheet" @select="handleSelect"
    @close="handleSheet(false)"></u-action-sheet>
  <u-modal :show="showGenerateModal" :showConfirmButton="false">
    <view class="w-100%">
      <view class="text-center">确定{{ generateState == 'delete' ? '删除' : generateState == 'reset' ? '重置' : '生成' }}{{ generateState == 'single' ? '单个' : generateState == 'delete' ? '此' : generateState == 'reset' ? '' : '全部' }}{{ generateState !=='reset' ? '音频' : ''}}吗?</view>
      <view class="mt-40rpx">
        <u-button class="modalBtn" @click="handleSaveAudio">确定</u-button>
        <u-button class="modalBtn" @click="showGenerateModal = false">取消</u-button>
      </view>
    </view>
  </u-modal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useActionSheet } from "./hooks/useActionSheet"
import { useGenerate } from "./hooks/useGnerate"

const safeAreaHeight = ref(0)

uni.getSystemInfo({
  success: (result) => {
    if(result.safeArea?.top) {
      safeAreaHeight.value = result.safeArea?.top
    }
  }
})

const {
  textContentArr,
  textContinueId,
  textKey,
  rolesList,
  title,
  showGenerateModal,
  generateState,
  handleContinue,
  handleSaveAudio,
  chooseTimbre,
  handleClearText,
  openGenerateModal,
  jumpToCustomText
} = useGenerate()

const {
  showActionSheet,
  sheetList,
  handleSelect,
  handleSheet
} = useActionSheet(title)
</script>

<style lang="scss" scoped>
.custom-style {
  width: 172rpx;
  height: 60rpx;
  border-radius: 442rpx;
  background: $base-background;
  border: 4rpx solid rgba(213, 255, 150, 1);
  margin: 0;
}

.cusSubArea {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0 32rpx 0;
  font-weight: bold;
  .custom-style-delete {
    width: 326rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background: rgba(244, 245, 248, 1);
  }
}
.custom-style-submit {
  width: 326rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background: $base-background;
  border: 2rpx solid rgba(31, 33, 38, 1);
  border: unset;
}

.custom-style-submit-all {
  color: #fff;
  margin: 64rpx 0 16rpx 0;
  height: 96rpx;
  border-radius: 48rpx;
  background: rgba(31, 31, 41, 1);
}

.custom-style-reset {
  margin-bottom: 34rpx;
  background: transparent;
  color: rgba(0, 0, 0, 1);
  border: unset;
}

.robot {
  background: url('@/static/image/generate/robot_bg.png') no-repeat;
  background-size: 100% 100%;

  >uni-image {
    @include domSize(296rpx, 316rpx);
    position: absolute;
    bottom: 42rpx;
  }

  .text {
    position: absolute;
    bottom: 60rpx;
    width: calc(100% - 72rpx);

    >uni-view {
      font-size: 28rpx;
      font-weight: bold;
      width: 338rpx;
      height: 84rpx;
      line-height: 42rpx;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10rpx;
      margin: auto;
    }
  }
}

::v-deep .customText {
  background: rgba(245, 245, 245, 1);
  padding: 24rpx 32rpx;

  .u-textarea__count {
    background: rgba(245, 245, 245, 1) !important;
    margin: 0 16rpx 12rpx;
  }
}

.customBtnSave {
  width: 100%;
  height: 96rpx;
  border-radius: 20rpx;
  background: $base-background;
  color: #000;
  font-weight: bold;
  margin-bottom: 32rpx;
}

.customBtnText {
  height: 96rpx;
  border-radius: 20rpx;
  background: rgba(32, 32, 40, 1);
  border: 2rpx solid rgba(31, 33, 38, 1);
  font-weight: bold;
  color: #fff;
}

.clearText {
  position: absolute;
  bottom: 16rpx;
  left: 32rpx;
  color: rgba(209, 209, 209, 1);
  font-size: 24rpx;
}

::v-deep .customActionSheet {
  font-weight: bold;

  .u-action-sheet__item-wrap__item {
    height: 140rpx;
  }

  .u-line {
    border: 2rpx solid rgba(246, 247, 240, 1) !important;
  }

  .u-action-sheet__cancel-text {
    height: 180rpx;
  }
}

::v-deep .u-textarea__field {
  font-size: 28rpx !important;
}

.textAreaEdit {
  @include domSize(32rpx, 32rpx);
  position: absolute;
  bottom: 20rpx;
  right: 20rpx;
}
.rolesListItem {
  width: 538rpx;
  height: 68rpx;
  border-radius: 432rpx;
  background: linear-gradient(90deg, rgba(218, 235, 246, 1) 1.85%, rgba(218, 246, 236, 1) 55.79%, rgba(226, 247, 221, 1) 100%);
  border: 2rpx solid rgba(255, 255, 255, 1);
  @include flexCenter();
  color: rgba(40, 41, 48, 1);
}
</style>