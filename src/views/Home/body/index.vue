<template>
  <div class="whole">
    <!-- 轮播图 -->
    <div class="show-box animate__animated animate__fadeInDown" ref="showBoxRef">
      <div class="block text-center">
        <el-carousel motion-blur>
          <el-carousel-item  v-for="(item, index) in showBox"  :key="index">
            <img  :src="item.img"  alt="未找到图片" class="carousel-image"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 内容主体 -->
    <div class="tag-box">
      <!-- 左侧帖子 -->
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
        <ul v-infinite-scroll="load" 
            class="infinite-list-wrapper" 
            :infinite-scroll-disabled="disabled" 
            infinite-scroll-delay="2000"
            style="overflow: auto">
          <div class="post-data" v-for="(item,index) in 100" :key="index" @click="infiniteRoute(item)">
            <el-card :style="{width: '100%'}" shadow="hover">
              <!-- 帖子图片 -->
              <div class="post-img" >
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
          <div class="post-state"> 
            <div v-if="loading">加载中....</div>
            <div v-if="noMore">已经到底了</div>
          </div>
        </ul>
      </div>
      <!-- 右侧标签 -->
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
            <span>微信号:</span>
            <span>{{ 1635024292 }}</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>邮箱:</span>
            <span style="margin-left: 12px;">{{ '147076154@qq.com' }}</span>
          </div>
          <div style="font-size: 12px; margin-top: 5px;">
            <span>QQ:</span>
            <span style="margin-left: 17px;">{{ 325339805 }}</span>
          </div>
        </el-card>
      </div>
      <!-- 右侧功能 -->
      <div class="side-feature" v-show="isScrolled">
        <div class="side-feature-box shezhi"><el-icon><Setting /></el-icon></div>
        <div class="side-feature-box" @click="showCenter"><el-icon><Edit /></el-icon></div>
        <div class="side-feature-box" @click="scrollToTop"><el-icon><Top /></el-icon></div>
      </div>
      <!-- 居中建议设置框 -->
      <div class="Settings-feedback" v-show="isSetting">
        <div class="Settings-box">
          <div class="title">反馈</div>
          <div class="type">
            <div class="type-item">反馈类型</div>
            <div class="type-content">
              <el-radio-group v-model="feedbackData.type">
                <el-radio value="1" size="small">提交你的需求及建议</el-radio>
                <el-radio value="2" size="small">提交你所遇到的bug</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="talk">
            <div class="talk-item">联系方式</div>
            <div class="input">
              <el-input v-model="feedbackData.talk" style="width: 100%;font-size: 13px;" placeholder="请输入您的任意联系方式" clearable/>
            </div>
          </div>
          <div class="text">
            <div class="text-item">反馈内容</div>
            <div class="input">
              <el-input v-model="feedbackData.text" style="width: 100%;height: 100px;font-size: 13px;" placeholder="请输入您的建议" type="textarea" :rows="4" clearable/>
            </div>
          </div>
          <div class="bug">
            <div class="bug-item">上传bug</div>
            <div class="input">
              <el-input v-model="feedbackData.bugText" style="width: 100%;font-size: 13px;" placeholder="请简单叙述您遇到的bug" clearable/>
              <div class="upload">
                <div class="imgORvideo" ref="mediaPreview">
                  <!-- 预留图片或视频位置 -->
                </div>
                <el-button type="primary" @click="handleUpload">上传图片或视频</el-button>
              </div>
            </div>
          </div>
          <div class="button">
            <button class="btn2" @click="cancelCenter">取消</button>
            <button class="btn1" @click="verifySubmit">确认</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 预留的结尾部分(暂无功能，高度为0) -->
    <div class="tag-footer">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,computed, onMounted,onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import 'animate.css';

const router = useRouter();
const text = ref('哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈')
// 轮播图数据
let showBox = ref([
  {
    img: 'https://static.hehuhu.com.cn/1642481190129.jpg'
  },
  {
    img: new URL('../../../assets/img/hutao.jpeg', import.meta.url).href
  },
]);


//#region element-plus 无限滚动
const count = ref(5)
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
// 标记是否已经跳过轮播图
const isScrolled = ref(false);

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
      // 标记已经跳过轮播图
      isScrolled.value = true;
    }, 700);
  }
};
//#endregion

//#region 回到页面顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
//#endregion

//#region 监测页面滚动情况，isScrolled决定side-feature的显示与隐藏
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight/ 2;
  // 当滚动距离超过窗口高度时，isScrolled 为 true
  isScrolled.value = scrollTop >= windowHeight;
};
//#endregion

//#region 关注按钮
const myfollow = () => {
  console.log('关注');
}
//#endregion

//#region 帖子跳转
const infiniteRoute = (item:any) => {
  // 跳转到指定路由
  router.push('/home-content/item');
  /**
   * 调用接口请求数据
   */
}
//#endregion

//#region 反馈数据
const feedbackData = ref({
  type:'1',
  talk:'',
  text:'',
  bugText:''
});
// 引用预留位置的DOM元素
const mediaPreview = ref<HTMLDivElement | null>(null);
let selectedFile: File | null = null;

// 处理上传的函数
const handleUpload = () => {
  // 创建一个文件选择输入元素
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*, video/*'; // 限制选择的文件类型为图片或视频
  input.multiple = false; // 不允许选择多个文件

  // 监听文件选择事件
  input.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const fileType = file.type;

      // 判断文件类型是否为图片或视频
      if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
        selectedFile = file; // 保存选中的文件

        // 创建一个新的元素来显示预览
        const previewElement = document.createElement(fileType.startsWith('image/') ? 'img' : 'video');
        previewElement.style.width = '100%';
        previewElement.style.height = 'auto';

        if (fileType.startsWith('image/')) {
          (previewElement as HTMLImageElement).src = URL.createObjectURL(file);
        } else if (fileType.startsWith('video/')) {
          (previewElement as HTMLVideoElement).src = URL.createObjectURL(file);
          (previewElement as HTMLVideoElement).controls = true;
        }

        // 清空预留位置的内容
        if (mediaPreview.value) {
          mediaPreview.value.innerHTML = '';
          // 将预览元素添加到预留位置
          mediaPreview.value.appendChild(previewElement);
        }
      } else {
        alert('请选择图片或视频文件');
      }
    }
  });

  // 触发文件选择对话框
  input.click();
}
//#endregion

//#region 反馈框
  const isSetting = ref(false);
  // 显示反馈框
  const showCenter = () => {
    isSetting.value = true;
    document.body.style.overflow = 'hidden';
  }
  // 取消反馈框
  const cancelCenter = () => {
    isSetting.value = false;
    document.body.style.overflow = 'auto';
    // 清空数据
    feedbackData.value = {
      type:'1',
      talk:'',
      text:'',
      bugText:''
    }
  }
  // 确认提交反馈
  const verifySubmit = () => {
    isSetting.value = false;
    document.body.style.overflow = 'auto';
    console.log(feedbackData.value, selectedFile);
    // 判断反馈内容或者bug内容是否为空
    if (!feedbackData.value.text && !feedbackData.value.bugText) {
      ElMessage.warning('反馈内容或bug内容不能为空');
      return;
    }
    ElMessage.success('提交成功');
    // 清空数据
    feedbackData.value = {
      type:'1',
      talk:'',
      text:'',
      bugText:''
    }
  }
//#endregion
onMounted(() => {
  if (showBoxRef.value) {
    showBoxRef.value.addEventListener('wheel', handleWheel, { passive: false });
  }
  window.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
  if (showBoxRef.value) {
    showBoxRef.value.removeEventListener('wheel', handleWheel);
  } 
  window.removeEventListener('scroll', handleScroll);
})
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
      .infinite-list-wrapper{
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
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                object-fit: cover;
                transition: transform 0.3s ease-in-out;
              }
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
              img{
                transform: scale(1.1) translateY(10px);
                
              }
            }
          }
        }
        .post-state{
          width: 100%;
          height: 30px;
          font-size: 20px;
          font-family: SimSun;
          border-top: 1px solid black;
          display: flex;
          justify-content: center;
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
            :deep(.el-icon){
              font-size: 20px;
            }
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
    .side-feature{
      position: fixed;
      width: 30px;
      height: 100px;
      bottom: 20%;
      right: 0;
      display: flex;
      flex-direction: column;
      .side-feature-box{
        width: 100%;
        color: white;
        font-size: 17px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative; // 相对定位，为伪元素提供定位参考
        overflow: hidden; // 避免伪元素溢出影响布局
        background-color: rgb(73, 177, 245);
        margin-bottom: 3px; // 子盒子之间的间距

        // 使用伪元素撑开高度
        &::before {
          content: '';
          display: block;
          padding-top: 100%; // 伪元素的 padding-top 等于子盒子的宽度
        }
      }
      .shezhi{
        :deep(.el-icon){
          animation: changeDeg 2s linear infinite;
        }
      }
      @keyframes changeDeg {
        0% {
          rotate: 0deg;
        }
        100% {
          rotate: 360deg;
        }
      }
    }
    .Settings-feedback{
      width: 100%;
      height: 100%;
      background-color: rgba(129, 124, 124, 0.658);
      position: absolute;
      top: 100vh;
      left: 0;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      .Settings-box{
        width: 600px;
        height: 500px;
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        .title{
          width: 100%;
          height: 50px;
          font-size: 18px;
          font-weight: 500;
        }
        .type{
          width: 100%;
          height: 50px;
          font-size: 13px;
          display: flex;
          align-items: center;
          margin-top: 10px;
          .type-item{
            width: 15%;
            height: 50px;
            display: flex;
            align-items: center;
          }
        }
        .talk{
          width: 100%;
          height: 50px;
          font-size: 13px;
          display: flex;
          align-items: center;
          .talk-item{
            width: 15%;
            height: 50px;
            display: flex;
            align-items: center;
          }
          .input{
            width: 100%;
            display: flex;
            align-items: center;
          }
        }
        .text{
          width: 100%;
          height: 100px;
          font-size: 13px;
          display: flex;
          margin-top: 5px;
          .text-item{
            width: 15%;
            height: 30px;
            display: flex;
            align-items: center;
          }
          .input{
            width: 100%;
            height: 100%;
            display: flex;
          }
        }
        .bug{
          width: 100%;
          height: 100px;
          font-size: 13px;
          display: flex;
          margin-top: 5px;
          .bug-item{
            width: 15%;
            height: 30px;
            display: flex;
            align-items: center;
          }
          .input{
            width: 100%;
            .upload{
              width: 100%;
              margin-top: 10px;
              display: flex;
              .imgORvideo{
                width: 100px;
                height: 100px;
                background-color: rgb(210, 210, 210);
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  width: 100%;
                  height: 100%;
                }
                video{
                  width: 100%;
                  height: 100%;
                }
              }
              :deep(.el-button){
                margin-left: 20px;
              }
            }
          }
        }
        .button{
          width: 100%;
          height: 30px;
          margin-top: 50px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          button{
            width: 70px;
            height: 30px;
            margin-left: 10px;
            border-radius: 3px;
            cursor: pointer;
          }
          .btn2{
            background-color: #fff;
            border: 1px solid #409eff;
          }
          .btn2:hover{
            background-color: #e4f0fc;
          }
          .btn1{
            color: azure;
            background-color: #409eff;
            border: none;
          }
          .btn1:hover{
            background-color: #8fc6fe;
          }
        }
      }
    }
  }

 .tag-footer{
    width: 100%;
    height: 0px;
    background-color: red;
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