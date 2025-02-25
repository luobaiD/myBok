<template>
  <div class="star-container">
    <div 
      v-for="(star, index) in stars" 
      :key="'star-' + index"
      class="star"
      :style="starStyle(star)"
    />
    <div
      v-for="(meteor, index) in meteors"
      :key="'meteor-' + index"
      class="meteor"
      :style="meteorStyle(meteor)"
    />
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
}

interface Meteor {
  x: number
  y: number
  length: number
  angle: number
  speed: number
  opacity: number
}

const stars = reactive<Star[]>([])
const meteors = reactive<Meteor[]>([])
const containerSize = reactive({ width: 0, height: 0 })

// 星星样式
const starStyle = (star: Star) => ({
  left: star.x + 'px',
  top: star.y + 'px',
  width: star.size + 'px',
  height: star.size + 'px',
  opacity: star.opacity,
  animationDuration: star.twinkleSpeed + 's'
})

// 流星样式
const meteorStyle = (meteor: Meteor) => ({
  left: meteor.x + 'px',
  top: meteor.y + 'px',
  width: meteor.length + 'px',
  transform: `rotate(${meteor.angle}deg)`,
  opacity: meteor.opacity
})

// 生成随机数
const random = (min: number, max: number) => 
  Math.random() * (max - min) + min

// 初始化星星
const initStars = () => {
  const count = 300 // 星星数量
  for (let i = 0; i < count; i++) {
    stars.push({
      x: random(0, containerSize.width),
      y: random(0, containerSize.height),
      size: random(1, 3),
      opacity: random(0.3, 1),
      speed: random(0.5, 1.5),
      twinkleSpeed: random(1, 3)
    })
  }
}

// 更新星星位置
const updateStars = () => {
  stars.forEach((star, index) => {
    star.x -= star.speed
    if (star.x < -10) {
      stars.splice(index, 1)
      stars.push({
        x: containerSize.width,
        y: random(0, containerSize.height),
        size: random(1, 3),
        opacity: random(0.3, 1),
        speed: random(0.5, 1.5),
        twinkleSpeed: random(1, 3)
      })
    }
  })
}

// 创建流星
const createMeteor = () => {
  meteors.push({
    x: random(containerSize.width * 0.5, containerSize.width),
    y: random(0, containerSize.height * 0.5),
    length: random(50, 100),
    angle: -45,
    speed: random(10, 15),
    opacity: 1
  })
}

// 更新流星位置
const updateMeteors = () => {
  meteors.forEach((meteor, index) => {
    meteor.x -= meteor.speed
    meteor.y += meteor.speed * 0.5
    meteor.opacity -= 0.01
    
    if (meteor.opacity <= 0) {
      meteors.splice(index, 1)
    }
  })
}

// 动画循环
let animationFrame: number
const animate = () => {
  updateStars()
  updateMeteors()
  animationFrame = requestAnimationFrame(animate)
}

// 处理窗口大小变化
const handleResize = () => {
  containerSize.width = window.innerWidth
  containerSize.height = window.innerHeight
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  initStars()
  animate()
  
  // 定时生成流星
  setInterval(() => {
    if (meteors.length < 6) { // 最多同时存在3个流星
      createMeteor()
    }
  }, 3000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrame)
})
</script>

<style lang="scss" scoped>
.star-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #000000 0%, #0a0a2e 100%);
  overflow: hidden;
  z-index: -1;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(white 30%, transparent 70%);
    border-radius: 50%;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
}

.meteor {
  position: absolute;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.648) 100%
  );
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.84));
}
</style>
