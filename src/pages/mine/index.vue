<script lang="ts" setup></script>

<template>
  <view class="mine-box">
    <view class="header-box p-t">
      <view class="flex flex-justify-end px color-white mb2">消息</view>
      <view class="pl5 mb4 flex justify-between grid-items-center">
        <view class="flex grid-items-center">
          <u-avatar
            src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"
            icon="red-packet-fill"
            fontSize="22"
            size="50"
          ></u-avatar>
          <view class="flex flex-col ml4">
            <text class="color-white font-700">未登录</text>
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
        class="flex ml5 mr5 color-white member pl3 pr3 justify-between pt2 pb2"
      >
        <view class="flex flex-col menber-text-box justify-between">
          <view class="font-700 menber-text">硅音会员</view>
          <view class="sm-text menber-text">拥有会员专属权益</view>
        </view>
        <view class="btn-box">
          <u-button
            shape="circle"
            color="linear-gradient(to right,  rgb(167, 95, 55),rgb(137, 76, 38))"
            >立即开通</u-button
          >
        </view>
      </view>
    </view>
    <view class="content-box pl4 pr4">
      <!-- 数字资产 -->
      <view class="property flex mt2 border-rd">
        <view class="digital flex-col flex justify-between p-3">
          <view class="fw700 title">数字资产</view>
          <view>去查看</view>
        </view>
        <view class="border mt2 mb2"></view>
        <view class="card-holder flex-col flex justify-between p-3">
          <view class="fw700 title">我的卡包</view>
          <view>去查看</view>
        </view>
      </view>
      <!-- 常用功能 -->
      <view class="common-box mt4 border-rd p-3">
        <view class="fw700"> 常用功能 </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mine-box {
  min-height: calc(100vh - 100rpx);
  background-color: #f5f6fa;
  box-sizing: border-box;
  .header-box {
    height: 320rpx;
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
      box-sizing: border-box;
      height: 100rpx;
      border-top-left-radius: 30rpx;
      border-top-right-radius: 30rpx;
      background-color: #f6d5aa;
      .btn-box {
        width: 80px;
      }
      .menber-text-box {
        font-size: 0.875rem;
        height: 100%;
      }
      .menber-text {
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
        box-sizing: border-box;
        height: 100%;
        width: calc(50% - 2rpx);
        .title {
          font-size: 32rpx;
        }
      }
      .border {
        box-sizing: border-box;
        width: 2rpx;
        background-color: rgb(223, 223, 223);
      }
      .card-holder {
        font-size: 0.625rem;
        box-sizing: border-box;
        height: 100%;
        width: 50%;
        .title {
          font-size: 32rpx;
        }
      }
    }
    .common-box {
      box-sizing: border-box;
      height: 160rpx;
      background-color: #fff;
    }
  }
}
</style>
