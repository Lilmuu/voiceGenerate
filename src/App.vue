<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useGenerateStore } from '@/store/index'

onLaunch(() => {
  console.log('App Launch')
  // 没有token跳转登录页
  const token = uni.getStorageSync('token')
  if (!token) {
    uni.reLaunch({
      url: 'components/loginAndRegister/index'
    })
  }
  if(token) {
    const generateStore = useGenerateStore()
    generateStore.getDefaultVoice()
  }
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'uview-plus/index.scss';
</style>
