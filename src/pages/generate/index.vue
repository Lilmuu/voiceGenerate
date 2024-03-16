<template>
  <Navbar></Navbar>
  <view class="p-5">
    <view>标题内容：</view>
    <up-input class="mt-1 mb-2" placeholder="请输入标题，20字内" v-model="title" :maxlength="20">
      <template #suffix>
        <text class="font-size-24rpx">{{ title?.length || 0 }}/20</text>
      </template>
    </up-input>
    <u-button class="custom-style" type="primary" text="生成文本" @click="handleSheet(true)"></u-button>
    <template v-if="textKey">
      <view class="mt-1">音频文本：</view>
      <view v-for="(item,index) in textContentArr" :key="index">
        <view v-if="item.name" class="mt-1">{{ item.name }}</view>
        <u-textarea class="mt-1 mb-2" :maxlength="-1" v-model="item.text" placeholder="请输入内容" :spellcheck="false" :autoHeight="true"></u-textarea>
      </view>
      <u-button v-if="textContinueId !== -1" class="custom-style" type="primary" text="继续生成" @click="handleContinue"></u-button>
      <view class="font-size-26rpx flex items-center mb-2" v-for="(item,index) in rolesList" :key="index" @click="chooseTimbre(index)">
        <text>{{ item.label }}音色：</text>
        <image class="w-40 h-40 border-rd-50%" src="https://img2.baidu.com/it/u=4064245979,1540381279&fm=253&fmt=auto&app=138&f=JPEG?w=525&h=500"/>
        <text>{{ item.name }}</text>
        <u-icon name="arrow-down" size="16"></u-icon>
      </view>
    </template>
    <u-button class="custom-style-submit" type="primary" text="保存" @click="handleSaveAudio"></u-button>
  </view>
  <u-action-sheet :actions="sheetList" :closeOnClickOverlay="true" :closeOnClickAction="false" cancelText="取消" :show="showActionSheet" @select="handleSelect" @close="handleSheet(false)"></u-action-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useActionSheet } from "./hooks/useActionSheet"
import { useGenerate } from "./hooks/useGnerate"
import Navbar from "@/components/navbar/index.vue"

const {
  textContentArr,
  textContinueId,
  textKey,
  rolesList,
  title,
  handleContinue,
  handleSaveAudio,
  chooseTimbre
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
  width: 150rpx;
  margin: 20rpx 0;
}
.custom-style-submit {
  margin: 30rpx 0 0;
}
</style>