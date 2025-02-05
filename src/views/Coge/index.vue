<template>
  <div class="Coge-whole">
    <!-- 侧边栏 -->
    <Menu />

    <!-- 内容区 -->
    <div class="Coge-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Menu from './menu/index.vue'
</script>

<style scoped>
  .Coge-whole{
    width: 100%;
    height: 100%;
    display: flex;
    .Coge-content{
      width: 90%;
      height: 100%;
    }
  }
</style>