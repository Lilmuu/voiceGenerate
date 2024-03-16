<script lang="ts" setup>
import { userStore } from '@/store/index'
import { ref } from 'vue'
import { mineApi } from '@/api/index'
import { onShow } from '@dcloudio/uni-app'
const user = userStore()
const jumpTo = (url: string) => {
  uni.navigateTo({ url: url })
}

// 剩余积分
const residue = async () => {
  const res = (await mineApi.queryIntegral()) as any
  user.userInfo.integral = res.integral
  let userInfo = uni.getStorageSync('userInfo')
  userInfo.integral = res.integral
  uni.setStorageSync('userInfo', userInfo)
}

const showQR = ref(false)

onShow(() => {
  residue()
})
</script>

<template>
  <view class="mine-box">
    <view class="header-box p-t">
      <view class="pl5 mb4 flex justify-between grid-items-center mt6">
        <view class="flex grid-items-center">
          <u-avatar
            :src="
              user.userInfo.avatar ||
              'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
            "
            icon="red-packet-fill"
            fontSize="22"
            size="50"
          ></u-avatar>
          <view class="flex flex-col ml4">
            <text class="color-white font-700">{{
              user.userInfo.nickname || '未登录'
            }}</text>
            <text class="color-white mt1">普通用户</text>
          </view>
        </view>
        <view
          class="switch color-white tac flex flex-justify-end grid-items-center pr2"
        >
          切换组织
        </view>
      </view>
      <view
        class="flex ml5 mr5 color-white member pl3 pr3 justify-between pt2 pb2 grid-items-center"
      >
        <view class="font-700 menber-text"
          >剩余积分：{{ user.userInfo.integral }}</view
        >
        <view class="btn-box">
          <u-button
            @click="showQR = true"
            shape="circle"
            size="small"
            color="linear-gradient(to right,  rgb(167, 95, 55),rgb(137, 76, 38))"
            >充值</u-button
          >
        </view>
      </view>
    </view>
    <view class="content-box pl4 pr4">
      <!-- 常用功能 -->
      <view class="common-box mt4 border-rd p-3">
        <view class="fw700 mb2">常用功能</view>
        <view class="flex common-btn-list">
          <view @click="jumpTo('components/order')" class="common-item">
            充值记录
          </view>
          <view class="common-item" @click="jumpTo('components/audioList')"
            >合成列表</view
          >
          <view class="common-item" @click="jumpTo('components/consumeRecord')"
            >消耗记录</view
          >
        </view>
      </view>
      <!-- 系统设置 -->
      <view class="system-box mt4 border-rd p-3">
        <u-cell-group :border="false">
          <u-cell
            :border="false"
            icon="integral-fill"
            title="联系客服"
            isLink
            @click="showQR = true"
          ></u-cell>
          <u-cell
            @click="jumpTo('components/system')"
            :border="false"
            icon="integral-fill"
            title="系统设置"
            isLink
          ></u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
  <u-modal :show="showQR" title="联系客服" @confirm="showQR = false">
    <view>
      <image
        class="w-400rpx h-400rpx"
        src="https://img0.baidu.com/it/u=2021266978,582980172&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
        mode="scaleToFill"
      />
    </view>
  </u-modal>
</template>

<style lang="scss" scoped>
.mine-box {
  min-height: calc(100vh - 100rpx);
  background-color: #f5f6fa;
  .header-box {
    height: 340rpx;
    width: 100%;
    background-color: #16162e;
    .userInfo {
      font-size: 0.875rem;
    }
    .switch {
      height: 60rpx;
      width: 160rpx;
      background-color: #2b2f46;
      border-bottom-left-radius: 30rpx;
      border-top-left-radius: 30rpx;
      font-size: 0.75rem;
    }
    .member {
      height: 100rpx;
      border-top-left-radius: 30rpx;
      border-top-right-radius: 30rpx;
      background-color: #f6d5aa;
      .menber-text {
        font-size: 0.875rem;
        color: #8c5832;
      }
      .sm-text {
        font-size: 0.75rem;
      }
    }
  }
  .content-box {
    .property {
      background-color: #fff;
      height: 120rpx;
      .digital {
        font-size: 0.625rem;
        height: 100%;
        width: calc(50% - 2rpx);
        .title {
          font-size: 32rpx;
        }
      }
      .border {
        width: 2rpx;
        background-color: rgb(223, 223, 223);
      }
      .card-holder {
        font-size: 0.625rem;
        height: 100%;
        width: 50%;
        .title {
          font-size: 32rpx;
        }
      }
    }
    .common-box {
      font-size: 28rpx;
      background-color: #fff;
      .common-btn-list {
        height: 100rpx;
        width: 100%;
      }
      .common-item {
        width: 33%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .system-box {
      background-color: #fff;
    }
  }
}
</style>
