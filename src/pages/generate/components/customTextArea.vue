<template>
  <view class="customTextarea" ref="customTextarea" :contenteditable="true" placeholder="请输入文本内容" :spellcheck="false" :innerHTML="content" @input="updateContent">
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps(['content']);
const emit = defineEmits(['update:content']);

const content = ref(props.content);
const customTextarea = ref<HTMLElement | null>(null)

const updateContent = (event:any) => {
  
  // console.log(event);
  // if(customTextarea.value) {
  //   console.log(customTextarea.value);
  // }
  
  // content.value = event.target.innerText;
  // emit('update:content', event.target.innerText);
};

watch(() => props.content, (newValue) => {
  content.value = newValue;
});
</script>

<style lang="scss" scoped>
.customTextarea {
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 1);
  padding: 32rpx;
  outline: none;
}
</style>
