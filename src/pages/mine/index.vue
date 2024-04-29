<template>
  <view class="minePage h-569rpx relative">
    <view class="avatar flex pt-160rpx pl-42rpx">
      <image :src="user.userInfo.avatar" class="w-120rpx h-120rpx border-rd-50%" />
      <view class="userInfo">
        <view class="font-bold">{{ user.userInfo.nickname }}</view>
        <view class="markInfo">
          <image v-if="user.userInfo.user_type == '1'" src="@/static/image/mine/userMark.png" class="w-24rpx h-24rpx mr-6rpx" />
          <text>{{ user.userInfo.user_type == '1' ? 'VIP用户' : '普通用户' }}</text>
        </view>
      </view>
    </view>
    <view class="chargeArea">
      <view class="remind" :style="{'opacity': user.userInfo.hide ? '0' : '1'}">
        <view>
          <image src="@/static/image/mine/vip.png" class="w-80rpx h-31rpx" />
          <view class="flex-1 flex flex-justify-center">拥有硅灵会员专属权益</view>
          <u-button class="chargeBtn" @click="!user.userInfo.hide && (showQR = true)">充值</u-button>
        </view>
      </view>
      <view class="list">
        <view v-for="(item, index) in user.userInfo.hide ? chargeList.filter((el,key) => key == 1) : chargeList" :key="index" @click="jumpTo(item.path)">
          <image :src="item.image" class="w-96rpx h-96rpx" />
          <view class="font-size-28rpx mt-4rpx">{{ item.label }}</view>
        </view>
      </view>
    </view>
  </view>
  <view class="actionLists">
    <u-cell-group :border="false">
      <u-cell v-for="(item, index) in actionList" :key="index" :title="item.label" arrow-direction="right" isLink :border="false" @click="handleAction(item)">
        <template #icon>
          <image :src="item.image" class="w-48rpx h-48rpx" />
        </template>
      </u-cell>
    </u-cell-group>
  </view>
  <view class="p-32rpx">
    <u-button class="logOut" @click="logOut">退出登录</u-button>
  </view>
  <u-modal :show="showQR" title="联系客服" :showConfirmButton="false">
    <view class="w-100%">
      <view class="flex flex-justify-center">
        <image
          class="w-400rpx h-400rpx"
          src="@/static/image/mine/qrCode.png"
          mode="scaleToFill"
        />
      </view>
      <view class="mt-40rpx">
        <u-button class="modalBtn" @click="showQR = false">确定</u-button>
      </view>
    </view>
  </u-modal>
  <u-modal :show="showLogOut" :showConfirmButton="false">
    <view class="w-100%">
      <view class="text-center">确定退出登录吗?</view>
      <view class="mt-40rpx">
        <u-button class="modalBtn" @click="handleLogOut">确定</u-button>
        <u-button class="modalBtn" @click="showLogOut = false">取消</u-button>
      </view>
    </view>
  </u-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ActionList } from "./type"
import { userStore } from '@/store/index'

const user = userStore()

const chargeList = ref([
  {
    label: '充值记录',
    image: '/static/image/mine/chargeRecord.png',
    path: '/pages/mine/components/order'
  },
  {
    label: '合成列表',
    image: '/static/image/mine/generateRecord.png',
    path: '/pages/mine/components/audioList'
  },
  {
    label: '消耗记录',
    image: '/static/image/mine/useRecord.png',
    path: '/pages/mine/components/consumeRecord'
  }
])

const actionList = ref<ActionList[]>([
  {
    label: '联系客服',
    image: '/static/image/mine/icon_service.png',
    key: 'service'
  },
  {
    label: '用户协议',
    image: '/static/image/mine/icon_user.png',
    key: 'user',
    path: 'privacyAndUser'
  },
  {
    label: '隐私协议',
    image: '/static/image/mine/icon_privacy.png',
    key: 'privacy',
    path: 'privacyAndUser'
  },
  {
    label: '设置',
    image: '/static/image/mine/icon_setting.png',
    key: 'setting',
    path: 'components/premission'
  },
  {
    label: '教程',
    image: '/static/image/mine/icon_course.png',
    key: 'course'
  },
])
const showQR = ref(false)
const showLogOut = ref(false)

const jumpTo = (path: string) => {
  if(!path) return
  uni.navigateTo({ url: path })
}

const handleAction = (val:ActionList) => {
  if(val.key == 'service') {
    showQR.value = true
  }else {
    if(val.path) {
      uni.navigateTo({ url: `${val.path}?key=${val.key}` })
    }else {
      uni.showToast({
        title: '功能暂无',
        icon: 'none',
        mask: true
      })
    }
  }
}

const logOut = () => {
  showLogOut.value = true
}

const handleLogOut = () => {
  user.removeLogin()
  uni.reLaunch({ url: '/components/loginAndRegister/index' })
}
</script>

<style lang="scss" scoped>
.minePage {
  background: url('@/static/image/mine/mine_bg.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 135rpx;

  .userInfo {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    margin-left: 32rpx;
  }

  .markInfo {
    width: 160rpx;
    height: 44rpx;
    opacity: 0.5;
    border-radius: 46rpx;
    background: rgba(255, 255, 255, 1);
    @include flexCenter();

    >uni-text {
      font-size: 24rpx;
      color: rgba(242, 169, 34, 1);
    }
  }

  .chargeArea {
    position: absolute;
    bottom: 31rpx;
    left: 0;
    right: 0;
    margin: auto;
    width: 686rpx;
    display: flex;
    justify-content: center;

    .remind {
      width: 620rpx;
      height: 194rpx;
      border-radius: 20rpx;
      background: linear-gradient(176.37deg, rgba(21, 33, 29, 1) 0%, rgba(0, 0, 0, 1) 100%);
      box-shadow: 0rpx 17rpx 51rpx 31rpx rgba(242, 245, 233, 1);
      padding: 28rpx 32rpx 0;

      >uni-view {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        color: rgba(255, 235, 214, 0.34);

        .chargeBtn {
          width: 112rpx;
          height: 52rpx;
          border-radius: 46rpx;
          background: linear-gradient(160.91deg, rgba(239, 204, 152, 1) 0%, rgba(222, 174, 104, 1) 100%);
          box-shadow: inset -4rpx -4rpx 4rpx rgba(82, 54, 20, 0.25), inset 4rpx 4rpx 8rpx rgba(255, 244, 191, 0.61);
          font-size: 24rpx;
          color: rgba(112, 83, 54, 1);
          border-color: unset;
        }
      }
    }

    .list {
      position: absolute;
      top: 98rpx;
      width: 100%;
      height: 230rpx;
      border-radius: 20rpx;
      background: url('@/static/image/mine/chargeList_bg.png') no-repeat;
      background-size: 100% 100%;
      box-shadow: 0rpx 8rpx 12rpx rgba(161, 171, 132, 0.16), 0rpx 17rpx 20rpx rgba(242, 245, 233, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 60rpx;

      >uni-view {
        display: flex;
        flex-flow: column;
        align-items: center;
      }
    }
  }
}

.actionLists {
  margin: 0 32rpx;
  box-shadow: 0rpx 17rpx 51rpx rgba(242, 245, 233, 1);
  border-radius: 20rpx;
  .u-cell {
    border-bottom: 2rpx solid rgba(246, 247, 240, 1);
    height: 128rpx;
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    .u-cell__body {
      height: 100%;
    }
  }
}
.logOut {
  height: 96rpx;
  border-radius: 20rpx;
  background: rgba(14, 21, 19, 1);
  box-shadow: 0rpx 17rpx 51rpx  rgba(242, 245, 233, 1);
  font-size: 28rpx;
  color: #fff;
}
</style>

<!-- <script lang="ts" setup>
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
</script> -->

<!-- <template>
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
      常用功能
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
      系统设置
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
</template> -->

<!-- <style lang="scss" scoped>
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
</style> -->
