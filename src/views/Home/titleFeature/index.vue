<template>
  <div class="title animate__animated animate__fadeInDown" ref="scrollableDiv" :style="{color: titleColor,backgroundColor: titleBackground}">
      <!-- logo -->
      <div class="title-name">
        <p>欢迎使用</p>
      </div>
      <div class="title-Feature">
        <!-- 搜索框 -->
        <div class="title-search" style="margin-right: 20px;">
          <Search></Search>
        </div>
        <!-- 菜单 -->
        <div class="title-tag" :style="{color: titleColor}">
          <NavMenu v-for="(item,index) in shuzu" :key="index" :shuju="item" @click="item.fun"/>
        </div>
        <!-- 头像 -->
        <div class="title-avatar" @click="router.push('/login')">
          <el-avatar :icon="UserFilled" />
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UserFilled } from '@element-plus/icons-vue'
import router from '@/router/index';
import  NavMenu  from '@/components/tools/NavMenu.vue';
import Search from '@/components/tools/Search.vue';
import 'animate.css';


const shuzu = ref([
  {
    title: '留言',
    icon: 'Message',
    path: '/message',
    fun: () => {
      console.log('点击了留言')
    }
  },
  {
    title: '设置',
    icon: 'Setting',
    path: '/setting',
    fun: () => {
      console.log('点击了设置')
    }
  },
  {
    title: '游戏',
    icon: 'Monitor',
    path: '/game',
    children: [
      {
        title: '别踩白块儿',
        path: '/game/snake',
        fun: () => {
          console.log('点击了别踩白块儿')
        }
      },
      {
        title: '俄罗斯方块',
        path: '/game/tetris',
        fun: () => {
          console.log('点击了俄罗斯方块')
        }
      }
    ]
  },
  {
    title: '返回',
    icon: 'HomeFilled',
    path: '/',
    fun: () => {
      console.log('点击了返回')
      router.push('/home')
    }
  }
])


//#region 通过滚动距离改变title的颜色和背景颜色
let titleColor = ref('#fff')
let titleBackground = ref('rgba(255, 255, 255, 0)')
const isScrollTop = ref(false)

const handleScroll = () => {
  const scrollTop = window.scrollY;
  // 当滚动距离超过一定距离时，isScrolled 为 true
  isScrollTop.value = scrollTop >= 20;
  // 改变顶部菜单文字颜色和背景颜色
  titleColor.value = isScrollTop.value ? '#000' : '#fff';
  titleBackground.value = isScrollTop.value? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0)';
};
//#endregion

//#region 通过滚动显示和隐藏title
const scrollableDiv = ref<HTMLElement | null>(null);
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollableDiv.value == null) return
    if (currentScrollTop > lastScrollTop) {
        scrollableDiv.value.style.display = 'none';
    } else if (currentScrollTop < lastScrollTop) {
        scrollableDiv.value.style.display = 'flex';
    }
    lastScrollTop = currentScrollTop;
});
//#endregion


onMounted(() => {
  window.addEventListener('scroll', handleScroll); 
})
</script>

<style scoped lang="scss">
  .title{
    width: 100%;
    min-width: 850px;
    height: 50px;
    color: #fff;
    // background-color: rgb(255, 255, 255, 0.6);
    background-color: none;
    background-clip: content-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    .title-name{
      font-size: 23px;
      font-weight: bold;
      font-family: 'sans-serif';
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      letter-spacing: 5px;
      font-style: italic;
      margin-left: 25px;
    }
    .title-name:hover{
      cursor: pointer;
    }
    .title-Feature{
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 50%;
      font-size: 15px;
      color: #000000;
      font-family: 'sans-serif';
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      font-style: italic;
      .title-tag{
        height: 50px;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000000;
        font-family:'sans-serif';
      }
      .title-avatar{
        width: 40px;
        height: 40px;
        margin-right: 30px;
        :deep(.el-avatar){
          width:35px;
          height: 35px;
        }
      }
    }
  }
</style>