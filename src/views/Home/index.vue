<template>
  <div class="home-box">
    <div class="title">
      <TitleFeature />
    </div>
    <div class="home-body">
      <BodyFeature />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import TitleFeature from './titleFeature/index.vue';
import BodyFeature from './body/index.vue'
import { interlayer } from '@/interlayer';

//监测页面是否下拉或上移
window.addEventListener('scroll', function() {
  console.log('页面正在滚动');
});
</script>

<style scoped lang="scss">
  .home-box{
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(157, 157, 240, 0.693),rgba(244, 174, 186, 0.764));
    display: flex;
    flex-direction: column;
    position: relative;
    .title{
      width: 100%;
      height: 50px;
      position: absolute;
      top: 0;
      z-index: 10;
    }
    .home-body{
      max-width: 100%;
    }
  }
</style>