<template>
  <div class="input-container">
    <div :class="{ 'expanded': isExpanded }" class="input-wrapper">
      <div class="icon" @click.stop="toggleExpand">
        <el-icon><Search /></el-icon>
      </div>
      <input
        v-if="isExpanded"
        ref="inputRef"
        type="text"
        v-model="inputValue"
        placeholder="请输入内容"
        class="input-field"
        @focus="onInputFocus"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue';

const isExpanded = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref('');

// 切换输入框展开状态的方法
const toggleExpand = async () => {
  // 切换展开状态
  isExpanded.value = !isExpanded.value;
  // 等待 DOM 更新完成
  await nextTick();
  
  // 如果输入框展开且输入框元素存在
  if (isExpanded.value && inputRef.value) {
    // 输入框获取焦点
    inputRef.value.focus();
     // 选中文本
    inputRef.value.select();
  }
};

// 输入框获取焦点时的处理方法
const onInputFocus = () => {
  // 如果输入框元素存在
  if (inputRef.value) {
    // 选中文本
    inputRef.value.select();
  }
};

// 全局点击事件处理方法
const handleGlobalClick = (event: MouseEvent) => {
  // 如果输入框元素存在且输入框处于展开状态
  if (inputRef.value && isExpanded.value) {
    // 判断点击事件是否发生在输入框内部
    const isInside = inputRef.value.contains(event.target as Node);
    // 获取输入框包装器元素
    const wrapper = document.querySelector('.input-wrapper');
    // 判断点击事件是否发生在包装器内部
    const isWrapperClicked = wrapper?.contains(event.target as Node);
    // 如果点击事件既不在输入框内部也不在包装器内部
    if (!isInside && !isWrapperClicked) {
      isExpanded.value = false;
    }
  }
};

// 监听输入框值的变化
const watchInputValue = () => {
  if (inputValue.value) {
    console.log('输入框的值发生了变化：', inputValue.value); 
  } 
}

//#region 组件的挂载与卸载
onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleGlobalClick);
});
//#endregion

</script>

<style scoped lang="scss">
.input-container {
  position: relative;
  display: inline-block;
}

.input-wrapper {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: width 0.5s ease;

  &.expanded {
    width: 300px;
    border-radius: 15px;
    justify-content: flex-start;
  }
}

.icon {
  padding: 0 8px;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 8px;
  opacity: 0; /* 初始透明度为 0 */
  transition: opacity 0.2s ease 0.3s; /* 延迟 0.3s 后开始透明度过渡 */

  /* 展开时显示输入框内容 */
  .input-wrapper.expanded & {
    opacity: 1;
  }
}

/* 输入框过渡动画 */
.input-slide-enter-active,
.input-slide-leave-active {
  transition: width 0.3s ease;
}

.input-slide-enter,
.input-slide-leave-to {
  width: 0;
}
</style>