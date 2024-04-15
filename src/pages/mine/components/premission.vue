<script lang="ts" setup>
import { ref } from 'vue'

const isOpenMessage = ref(false)

const routerToPremission = () => {}
</script>

<template>
  <view class="system-box">
    <u-navbar
      :fixed="false"
      height="40"
      :autoBack="true"
      :is-back="false"
      :title-bold="true"
      title="系统设置"
      class="font-bold"
    >
    </u-navbar>
    <view class="content-box">
      <u-cell title="消息通知">
        <template #value>
          <u-switch
            size="20"
            v-model="isOpenMessage"
            :class="{'activeSwitch':isOpenMessage}"
          ></u-switch>
        </template>
      </u-cell>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.system-box {
  height: calc(100vh);
  .content-box {
    height: calc(100vh - 80rpx);
  }
}
.popup-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  width: 400rpx;
  .button-box {
    display: flex;
  }
}

::v-deep .activeSwitch {
  background-color: unset!important;
  background: $base-background;
}
</style>
