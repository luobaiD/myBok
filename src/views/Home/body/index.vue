<template>
  <div class="whole">
    <div class="show-box" ref="showBoxRef">
      <div class="block text-center">
        <el-carousel motion-blur>
          <el-carousel-item  v-for="(item, index) in showBox"  :key="index">
            <img  :src="item.img"  alt="未找到图片" class="carousel-image"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="tag-box">
      <div class="tag-post">
        <!-- 公告 -->
        <div class="tap-post-announcement">
          <el-card :style="{width: '100%', height: '30px'}" shadow="hover">
            <el-icon style="margin-left: 10px;margin-right: 10px;"><Bell /></el-icon> 
            <span>公告</span>
            <span style="margin-left: 20px;color: black;font-size: 13px;">{{ '2025.2.3| 1.0.0版本问世' }}</span>
          </el-card>
        </div>
        <!-- 帖子 -->
        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
          <div class="post-data" v-for="(item,index) in 10" :key="index">
            <el-card :style="{width: '100%'}" shadow="hover">
              <!-- 帖子图片 -->
              <div class="post-img" style="">
                <img src="@/assets/Logo/Html.png" alt="" style="width: 100%;height: 100%;">
              </div>
              <!-- 帖子内容 -->
              <div class="post-content">
                <div class="content-box">
                  <!-- 标题 -->
                  <h4>图片的多种导入形式,如果遇到无法导入图片的情况该如何解决</h4>
                  <!-- 标签 -->
                  <div class="tag-sort" >
                    <el-icon><Calendar /></el-icon>  <span>{{ '2025.2.4' }}</span>
                    <span style="font-size: 15px;">|</span>
                    <span>{{ '前端' }}</span>
                    <span style="font-size: 15px;">|</span>
                    <span>{{ 'Html' }}</span>
                  </div>
                  <!-- 内容 -->
                  <div class="content">
                    {{ text }}
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </ul>
      </div>
      <div class="tag-profile">
        <!-- 个人数据 -->
        <el-card :style="{width: '100%',marginTop: '50px'}" shadow="always" class="profile-one">
          <div :style="{width: '80px',height: '80px',borderRadius: '50%',margin:'0 auto'}">
            <!-- 头像 -->
            <img :src="showBox[1].img" :style="{width: '100%',height: '100%',borderRadius: '50%'}">
          </div>
          <!-- 名字 -->
          <p class="profile-name">{{ '裸白' }}</p>
          <!-- 自我介绍 -->
          <p class="my-profile-intro" style="font-size: 15px;">{{ '一名努力的前端菜鸟' }}</p>
          <!-- 关注数据 -->
          <div class="profile-data" style="display: flex;justify-content: space-around;margin-top: 25px;">
            <div style="text-align: center;margin: 10px;">点赞 <p>{{ '1w+' }}</p></div>
            <div style="text-align: center;margin: 10px;">粉丝 <p>{{ '2999' }}</p></div>
            <div style="text-align: center;margin: 10px;">文章 <p>{{ '100' }}</p></div>
          </div>

          <!-- 关注按钮 -->
          <div class="profile-follow" @click="myfollow">
            <div class="fllow-bac"></div>
            <div class="fllow-p">
              <el-icon><CollectionTag /></el-icon>
              <span style="margin-left: 5px;">收藏</span>
            </div>
          </div>
        </el-card>

        <!-- 网站数据 -->
        <el-card :style="{width: '100%',marginTop: '20px',alignItems: 'flex-start'}" shadow="always" class="profile-one">
          <h4 style="display: flex;align-items: center;">
            <el-icon><DataLine /></el-icon>
            <span style="margin-left: 10px;">网站数据</span>
          </h4>
          <div style="font-size: 12px; margin-top: 10px;">
            <span>网站创立：</span>
            <span>2025.1.3</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>总访问量：</span>
            <span>{{ 0 }}</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>网站状态：</span>
            <span>{{ '正在开发' }}</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>正在访问：</span>
            <span>{{ 1 }}</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>上次更新：</span>
            <span>{{ '2025.2.3' }}</span>
          </div>
        </el-card>

        <!-- 联系方式 -->
        <el-card :style="{width: '100%',marginTop: '20px',alignItems: 'flex-start'}" shadow="always" class="profile-one">
          <h4 style="display: flex;align-items: center;">
            <el-icon><Edit /></el-icon>
            <span style="margin-left: 10px;">联系方式</span>
          </h4>
          <div style="font-size: 12px; margin-top: 10px;">
            <span>手机号:</span>
            <span>{{ 16635024292 }}</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>邮箱:</span>
            <span style="margin-left: 12px;">{{ '1470706154@qq.com' }}</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>QQ:</span>
            <span style="margin-left: 17px;">{{ 3253839805 }}</span>
          </div>
        </el-card>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref,computed, onMounted,onBeforeUnmount } from 'vue';

const text = ref('哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈')
let showBox = ref([
  {
    img: 'https://static.hehuhu.com.cn/1642481190129.jpg'
  },
  {
    img: new URL('../../../assets/img/hutao.jpeg', import.meta.url).href
  },
]);

//#region
/**
 * 帖子下滑加载数据及方法
 */
const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 5)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 2
    loading.value = false
  }, 2000)
}
//#endregion


//#region 轮播图滚轮向下磁吸效果
const showBoxRef = ref<HTMLElement | null>(null);
let isScrolling = false;

const handleWheel = (event: WheelEvent) => {
  if (isScrolling) return;
  
  // 仅处理向下滚动
  if (event.deltaY > 0) {
    event.preventDefault();
    isScrolling = true;
    
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });

    // 1秒后重置滚动状态（根据实际动画时间调整）
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
};
//#endregion

// 关注按钮
const myfollow = () => {
  
}

onMounted(() => {
  if (showBoxRef.value) {
    showBoxRef.value.addEventListener('wheel', handleWheel, { passive: false });
  }
});
</script>

<style scoped lang="scss">
.whole {
  width: 100%;
  height: 100vh; /* 使用视口高度 */

  .show-box {
    width: 100%;
    height: 100vh; /* 占满整个视口 */

    .block {
      width: 100%;
      height: 100%;
    }
  }

  .tag-box {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, #db7c7c52, #65a5e43d);
    .tag-post{
      width: 50%;
      margin-right: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tap-post-announcement{
        width: 100%;
        height: 30px;
        margin-top: 50px;
        :deep(.el-card__body){
          width: 100%;
          height: 100%;
          padding: 0;
          font-size: 18px;
          color: red;
          display: flex;
          align-items: center;
          span{
            font-size: 15px;
          }
        }
      }
      .infinite-list{
        width: 100%;
        height: 900px;
        padding: 0;
        margin: 20px 0;
        list-style: none;
        .post-data{
          width: 100%;
          height: 240px;
          padding: 10px 0;
          :deep(.el-card){
            height: 100%;
          }
          :deep(.el-card__body){
            width: 100%;
            height: 100%;
            padding: 10px;
            font-size: 18px;
            display: flex;
            align-items: center;
            .post-img{
              width: 200px;
              height: 200px;
              background-color: red;
            }
            .post-content{
              width: 540px;
              height: 90%;
              // background-color: red;
              display: flex;
              justify-content: center;
              align-items: center;
              .content-box{
                width: 80%;
                height: 100%;
                display: flex;
                flex-direction: column;
                h4{
                  //多行省略,edge浏览器(旧版)不支持,Internet Explorer完全不支持，Firefox默认不支持
                  line-height: 1.5em;
                  max-height: 3em; /* 3行 × 1.5em */
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                }
                .tag-sort{
                  width: 100%;
                  height: 20px;
                  font-size: 12px;
                  margin-top: 5px;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  span{
                    margin-left: 5px;
                    margin-right: 5px;
                  }
                }
                .content{
                  width: 98%;
                  height: 70px;
                  font-size: 14px;
                  margin-top: 15px;
                  //多行省略,edge浏览器(旧版)不支持,Internet Explorer完全不支持，Firefox默认不支持
                  line-height: 1.5em;
                  max-height: 4.5em; /* 3行 × 1.5em */
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                }
              }
            }
          }
        }
        .post-data:hover{
          cursor: pointer;
          :deep(.el-card__body){
            .post-img{
              width: 220px;
                height: 220px;
            }
          }
        }
      }
     
    }
    .tag-profile{
      width: 250px;
      display: flex;
      flex-direction: column;
      :deep(.profile-one){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        p{
          text-align: center;
        }
        .profile-name{
          font-size: 22px;
        }
        .profile-follow{
          width: 200px;
          height: 26px;
          margin-top: 15px;
          color: aliceblue;
          background-color: rgb(30, 109, 227);
          border-radius: 0 0 10px 10px;
          text-align: center;
          position: relative;
          .fllow-bac{
            width: 0%;
            height: 70%;
            border-radius: 0 0 10px 10px;
            background-color: rgb(247, 123, 40);
            position: absolute;
            transition: width 0.5s, height 0.3s;
          }
          .fllow-p{
            position: relative;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .profile-follow:hover{
          .fllow-bac{
           width: 100%;
           height: 100%;
          }
        }
      }
    }
  }
}

/* 深度穿透覆盖 Element Plus 样式 */
:deep(.el-carousel) {
  height: 100%;
  .el-carousel__container {
    height: 100% !important;
  }
  .el-carousel__item {
    height: 100% !important;
  }
}
:deep(.el-card){
  user-select: none
}
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 媒体查询，当屏幕宽度过低时取消帖子图片的展示 */
@media (max-width: 850px) {
  .tag-post .infinite-list .post-data :deep(.el-card__body) .post-img {
    display: none;
  }
}
</style>