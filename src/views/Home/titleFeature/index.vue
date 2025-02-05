<template>
  <div class="title">
      <!-- logo -->
      <div class="title-name">
        <p>欢迎使用</p>
      </div>
      <div class="title-Feature">
        <!-- 菜单 -->
        <div class="title-tag">
          <NavMenu v-for="(item,index) in shuzu" :key="index" :shuju="item" @click="item.fun"/>
        </div>
        <!-- 头像 -->
        <div class="title-avatar">
          <el-avatar :icon="UserFilled" />
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UserFilled } from '@element-plus/icons-vue'
import  NavMenu  from '@/components/tools/NavMenu.vue'

const shuzu = ref([
  {
    title: '搜索',
    icon: 'Search',
    path: '/search',
    fun: () => {
      console.log('点击了搜索')
    }
  },
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
    }
  }
])

</script>

<style scoped lang="scss">
  .title{
    width: 100%;
    height: 50px;
    // background-color: rgb(255, 255, 255, 0.6);
    background-color: none;
    background-clip: content-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    .title-name{
      font-size: 23px;
      color: #ffffff;
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
      width: 100px;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 50%;
      font-size: 15px;
      color: #000000;
      // background-color: red;
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
        margin-right: 30px;
      }
    }
  }
</style>