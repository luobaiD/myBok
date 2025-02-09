<template>
  <div class="content-whole">
    <!-- 作者 作者文章 类似文章 -->
    <div class="autho-Other">
      <div class="author">
        <el-card>
          <!-- 头像 -->
          <div class="avatar">
            <div class="author-avatar">
              <img src="@/assets/img/touxiang.png" alt="">
            </div>
            <div class="author-name">
              <p>{{ '裸白' }}</p>
            </div>
          </div>
          <!-- 数据量 -->
          <div class="author-data">
            <div>
              <span>粉丝</span>
              <span>{{ 10000 }}</span>
            </div>
            <div>
              <span>文章</span>
              <span>{{ 10000 }}</span>
            </div>
            <div>
              <span>评论</span>
              <span>{{ 10000 }}</span>
            </div>
            <div>
              <span>获赞</span>
              <span>{{ 10000 }}</span>
            </div>
          </div>
          <hr>
          <div class="author-button">
            <div class="understand-author">
              <button>私信</button>
              <button>关注</button>
            </div>
            <div class="button-route">
              <button>进入主页</button>
            </div>
          </div>
        </el-card>
      </div>
    </div>  
    <!-- 文章 -->
    <div class="article-MainBody">
      <h2>深入探讨Web应用开发：从前端到后端的全栈实践</h2>
      <div class="post-Message">
        <!-- 数据 -->
        <div>
          <span style="margin-right: 20px;">作者：<a href="#">裸白</a></span>
          <span style="margin-right: 20px;">发布时间：2023-08-01</span>
          <span style="margin-right: 20px;">
            <el-icon style="margin-right: 2px;"><View /></el-icon>
            阅读量：{{ 1000 }}
          </span>
          <span style="margin-right: 20px;">
            <el-icon style="margin-right: 2px;"><Star /></el-icon>
            收藏量：{{ 100 }}
          </span>
          <span style="margin-right: 20px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 14px;margin-right: 2px;">
              <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
            </svg>
            点赞量：{{ 830 }}
          </span>
        </div>
        <!-- 分类 -->
        <div style="font-size: 13px;margin-top: 5px;">
          <span>分类专栏：</span>
          <el-button size="small" v-for="item in 1">{{ '前端' }}</el-button>
        </div>
      </div>
      <!-- 前言 -->
      <div style="margin-top: 30px;">
        <h3>前言</h3>
        <div style="font-size: 14px;">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
</script>

<style scoped lang="scss">
.content-whole{
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(157, 157, 240, 0.693),rgba(244, 174, 186, 0.764));
  padding: 5px 0 5px 0;
  display: flex;
  justify-content: center;
  .article-MainBody{
    width: 50%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    padding: 5px 15px 5px 15px;
    .post-Message{
      width: 100%;;
      margin-top: 10px;
      background-color: rgb(186, 177, 177);
      font-size: 12px;
      padding: 5px 10px 5px 10px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      border-radius: 5px;
      div{
        width: 100%;
        height: 20px;
        display: flex
      };
      span{
        display: flex;
        align-items: center;
      }
    }
  }
  .autho-Other{
    width: 200px;
    height: 100%;
    margin-right: 10px;
    .author{
      width: 100%;
      height: 250px;
      :deep(.el-card){
        width: 100%;
        height: 100%;
      }
      :deep(.el-card__body){
        .avatar{
          width: 100%;
          height: 40px;
          display: flex;
          .author-avatar{
            width: 40px;
            height: 40px;
            display: flex; 
            justify-content: center;
            align-items: center;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
         .author-name{
            height: 100%;
            display: flex;
            align-items: center;
            margin-left: 15px;
            font-size: 14px;
         }
        } 
        .author-data{
          width: 100%;
          height: 70px;
          margin-top: 15px;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center; 
          div{
            width: 100%;
            margin: 0px 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          }
        }
       .author-button{
          width: 100%;
          height: 40px;
          .understand-author{
            width: 100%;
            height: 26px;
            margin-top: 10px;
            display: flex;
            justify-content: space-around;
            button{
              width: 75px;
              height: 26px;
              border: 1px solid rgb(186, 177, 177);
              border-radius: 14px;
              font-size: 11px;
            }
            button:hover{
              border: 1px solid black;
            }
          }
         .button-route{
            width: 100%;
            height: 26px;
            margin-top: 15px; 
            button{
              width: 100%;
              height: 26px;
              border: 1px solid rgb(186, 177, 177); 
              border-radius: 0px 0px 14px 14px;
              transition: all 0.5s;
              cursor: pointer;
            }
            button:hover{
             background-color: rgb(250, 176, 3); 
            }
         }
       }
      }
    }
  }
}

@media(max-width: 1200px){
  .content-whole{
    width: 100%;
    .article-MainBody{
      width: 80%;
    }
  } 
}
</style>