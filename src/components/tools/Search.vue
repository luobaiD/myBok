<template>
  <div class="input-container">
    <div :class="{ 'expanded': isExpanded }" class="input-wrapper"role="search" ref="inputBox">
      <div class="icon" @click.stop="toggleExpand">
        <el-icon><Search /></el-icon>
      </div>
       
      <input
        v-if="isExpanded"
        ref="inputRef"
        type="text"
        autofocus
        v-model="inputValue"
        class="input-field"
        :aria-expanded="isExpanded"
        @focus="handleFocus"
        @keyup.enter="handleSearch"    
      >
    </div>
    <div class="count-show" v-show="iscountShow" ref="countBox">
      <!-- 搜索中或未搜索到内容 -->
      <div class="is-searching" v-show="isSearching">
        <p>搜</p>
        <p>索</p>
        <p>中</p>
        <i>.</i>
        <i>.</i>
        <i>.</i>
      </div>
      <div class="search-count" v-show="!isSearching">
        <p v-for="i in 2">今天的早饭</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watchEffect } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { debounce } from 'lodash-es';

//#region 
/**
 * 状态管理
 * 1. 输入框展开状态
 * 2. 输入框值
 * 3. 输入框值
 * 4. 搜索框值
 * 5. 搜索内容
 * 6. 搜索列表展开状态
 * 7. 搜索列表
 */
const isExpanded = ref(false);
const inputBox = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const countBox = ref<HTMLDivElement | null>(null);
const inputValue = ref('');
const iscountShow = ref(true);
const searchList = ref([])
const isSearching = ref(false)
//#endregion


// 合并焦点处理逻辑
const toggleExpand = async () => {
  isExpanded.value = !isExpanded.value;
  
  if (isExpanded.value) {
    await nextTick();
    inputRef.value?.focus();
    inputRef.value?.select(); 
  }
};

const handleFocus = () => {
  inputRef.value?.select();
};

// 统一防抖处理
const handleSearch = debounce(() => {
  console.log('执行搜索:', inputValue.value);
}, 1000);

// 删除重复的全局点击处理
const handleGlobalClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.input-wrapper')) {
    isExpanded.value = false;
  }
};

// 监听输入框是否有文字输入
const handleInput = () => {
  if (isExpanded.value && inputBox.value) {
    if(inputValue.value.length > 0){
      iscountShow.value = true;
      inputBox.value.style.borderRadius = '15px 15px 0 0';
    }else{
      iscountShow.value = false;
      inputBox.value.style.borderRadius = '15px';
     }
  } else {
    iscountShow.value = false;
    if (inputBox.value) {
      inputBox.value.style.borderRadius = '15px';
    }
  }
};
watchEffect(() => {
  handleInput();
});

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
  text-shadow: none;
  .input-wrapper {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.expanded {
      width: 300px;
      border-radius: 15px;
      background: #fff;
      border: 1px solid #409eff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      .input-field {
        /* 关键修改4：确保输入框可见 */
        opacity: 1;
      }
    }

    .icon {
      height: 100%;
      padding: 0 6px;
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;;
      
      &:active {
        transform: scale(0.9);
      }
    }

    .input-field {
      flex: 1;
      border: none;
      background: transparent;
      opacity: 0;
      pointer-events: auto; // 确保始终可交互
      transition: opacity 0.3s ease;
      
      .expanded & {
        opacity: 1;
      }
      
      &:focus {
        outline: none;
        &::placeholder {
          color: transparent;
        }
      }
    }
  }
  .count-show {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0; 
    border-radius: 0 0 10px 10px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .is-searching {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      p{
        margin: 1px
      };
      i{
        animation: wave 1.5s ease-in-out infinite;
      }
      @keyframes wave {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-3px);
        }

        100% {
          transform: translateY(0);
        }
      }
      @for $i from 4 through 6 {
        & > *:nth-child(#{$i}) {
          animation-delay: ($i - 1) * 0.1s;
        }
      }
    }
    .search-count{
      width: 100%;
      max-height: 165px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      p{
        width: 100%;
        height: 30px;
        margin-top: 2px;
        padding: 5px 10px;
        font-size: 12px;
      }
      p:hover{
        color: #409eff;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>