<template>
   <div class="carousel-container">
    <div class="carousel">
      <div v-for="(item, index) in items" :key="index" class="carousel-item">
        <img :src="item.img">
      </div>
    </div>
    <div class="carousel-Toggle">
      <button @click="prevSlide">Prev</button>
      <button @click="nextSlide">Next</button>
    </div>
    <div class="carousel-down" @click="scrollDown"> 
      <el-icon><DArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import hutao from '@/assets/img/胡桃.jpeg'

const items = ref([
  {
    img: 'https://static.hehuhu.com.cn/1642481190129.jpg'
  },
  {
    img: hutao
  }
])



// 点击直接跳过整个轮播图展示页面
const scrollDown = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
}
</script>
  
<style scoped lang="scss">
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: red;

  .carousel {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;

    &.multiple-items {
      .carousel-item {
        flex: 0 0 33.33%;
        margin: 0 5px;
      }
    }
  }

  .carousel-item {
    flex: 0 0 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .carousel-Toggle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
    }
  }

  .carousel-down {
    width: 100px;
    height: 100px;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 10px; 
    position: absolute;
    left: 50%;
    bottom: 0;
    transform-origin: center;
    animation: identifier 1s infinite;
  }
  @keyframes identifier {
    0% {
      transform: translateY(0PX) translateX(-50%) rotate(90deg);
    }
    50%{
      transform: translateY(10PX) translateX(-50%) rotate(90deg);
    }
    100%{
      transform: translateY(0PX) translateX(-50%) rotate(90deg); 
    }
  }
}
</style>