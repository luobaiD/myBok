<template>
  <!-- 该组件为导航菜单单个组件 -->
  <div class="menu-whole">
    <div class="menu">
      <div class="menu-icon">
        <!-- 菜单图标 -->
        <el-icon>
          <component :is="shuju.icon" />
        </el-icon>
      </div>
      <div class="menu-name">
        <!-- 菜单名称 -->
        <span>{{shuju.title}}</span>
      </div>
      <div class="menu-isSon" v-if="shuju.children">
        <!-- 是否存在菜单 -->
        <el-icon><ArrowDown /></el-icon>
      </div>
    </div>
    <div class="menu-bottom"></div>
    <div class="menus">
      <div v-for="(item, index) in shuju.children" :key="index" class="menu-Options" @click="item.fun">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const props = defineProps({
  shuju: {
    type: Object,
    default: () => {
      return {
        title: '',
        icon: '',
        path: ''
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .menu-whole{
    height: 100%;
    margin: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .menu{
      height: 50%;
      // color: rgb(0, 0, 0);
      color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      .menu-icon{
        position: relative;
        top: 2px;
      }
      .menu-name{
        margin-left: 3px;
        margin-right: 2px;
      }
     .menu-isSon{
        margin-left: 2px;
        position: relative;
        top: 2px;
      }
    }
    .menu-bottom{
      width: 0;
      height: 3px;
      // margin-top: 5px;
      transition: all 1s;
    }
    .menus{
      width: 130%;
      font-size: 12px;
      padding: none;
      text-align: center;
      display: none;
      position: absolute;
      top: calc(100% + 0px); /* 在 menu 下方 40px 的位置显示 */
      left: -10px;
      background-color: #fff; /* 菜单背景颜色 */
      border-radius: 2px; /* 菜单边框圆角 */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 菜单阴影 */
      z-index: 10; /* 确保菜单在其他元素之上 */
      .menu-Options{
        width: 100%;
        height: 30px;
        // padding: 0px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .menu-Options:hover{
        background-color: #409EFF;
      }
    }

  }
  .menu-whole:hover{
    cursor: pointer;
    .menu-bottom{
      width: 100%;
      background-color: #409EFF;
    }
    .menus{
      display: block;
    }
  }
</style>