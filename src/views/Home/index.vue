<template>
  <div class="home-box">
    <div class="title">
      <TitleFeature />
    </div>
    <div class="home-body">
       <RouterView />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import TitleFeature from './titleFeature/index.vue';
import { RouterView } from 'vue-router';



</script>

<style scoped lang="scss">
  .home-box{
    width: 100%;
    height: 100vh;
    background: linear-gradient(to right, rgba(157, 157, 240, 0.693),rgba(244, 174, 186, 0.764));
    display: flex;
    flex-direction: column;
    position: relative;
    .title{
      width: 100%;
      height: 50px;
      position: fixed;
      top: 0;
      z-index: 10;
    }
    .home-body{
      max-width: 100%;
      height: 100%;
    }
  }
</style>