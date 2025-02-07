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

const toggleExpand = async () => {
  isExpanded.value = !isExpanded.value;
  await nextTick();
  
  if (isExpanded.value && inputRef.value) {
    inputRef.value.focus();
    inputRef.value.select();
  }
};

const onInputFocus = () => {
  if (inputRef.value) {
    inputRef.value.select();
  }
};

const handleGlobalClick = (event: MouseEvent) => {
  if (inputRef.value && isExpanded.value) {
    const isInside = inputRef.value.contains(event.target as Node);
    const wrapper = document.querySelector('.input-wrapper');
    const isWrapperClicked = wrapper?.contains(event.target as Node);
    
    if (!isInside && !isWrapperClicked) {
      isExpanded.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleGlobalClick);
});
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
}
</style>