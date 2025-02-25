<template>
  <!-- 邮箱昵称 -->
  <div class="first-box animate__animated animate__fadeIn" v-show="step === 1">
    <div class="title">创建您的账户</div>
    <div class="input-box">
      <div>
        <p>邮箱</p>
        <input type="text" placeholder="email" autocomplete="off-unique-value">
        <div><span>请输入正确的邮箱格式</span></div>   
      </div>
      <div>
        <p>昵称</p>
        <input type="text" placeholder="输入你的昵称" autocomplete="off-unique-value">
        <div><span>用户名必须为2~8个字符</span></div>
      </div>
    </div>
    <div class="back-login">
      <p>已有账户?</p>
      <span @click="router.push('/login')">登录</span>
    </div>
    <div class="next-step">
      <button @click="step = 2">下一步</button>
    </div>
  </div>

  <!-- 邮箱验证 -->
  <div class="second-box animate__animated animate__fadeIn" v-show="step === 2">
    <div class="back" @click="step = 1">
      <el-icon><Back /></el-icon>
    </div>
    <div class="title">我们向您发送了一个验证码</div>
    <div class="input-box">
      <span>{{ `在下面输入${email}的验证码` }}</span>
      <input type="text" placeholder="请输入验证码" autocomplete="off">
      <div><span v-show="true">验证码格式为6位</span></div>
    </div>
    <div class="send-again">
      <p>没有收到邮件?</p>
      <span>重新发送</span>
    </div>
    <div class="next-step">
      <button @click="step = 3">下一步</button>
    </div>
  </div>

  <!-- 个人联系方式 -->
  <div class="third-box animate__animated animate__fadeIn" v-show="step === 3">
    <div class="back" @click="step = 2">
      <el-icon><Back /></el-icon>
    </div>
    <div class="title">设置您的个人信息</div>
    <div class="input-box">
      <span>* 该页内容非必填项</span>
      <div class="phone">
        <p>手机号</p>
        <input type="text" autocomplete="off" placeholder="请输入手机号">
      </div>
      <div class="birth">
        <p>请选择出生日期 
          <el-icon><Calendar /></el-icon>
        </p>
        <div>
          <input type="text">
          <input type="text">
          <input type="text">
        </div>
      </div>
      <div class="sex">
        <div>
          <p>性别</p>
          <input type="text">
        </div>
        <div>
          <p>你当前职业是?</p>
          <input type="text">
        </div>
      </div>
    </div>
    <div class="next-step">
      <button @click="step = 4">下一步</button>
    </div>
  </div>

  <!-- 设置密码完成注册 -->
  <div class="fourth-box animate__animated animate__fadeIn" v-show="step === 4">
    <div class="back" @click="step = 3">
      <el-icon><Back /></el-icon>
    </div>
    <div class="title">设置您的密码</div>
    <div class="input-box">
      <div>
        <p>请创建一个8~20位的密码</p>
        <input type="password" placeholder="请输入密码" autocomplete="new-password">
        <span>密码格式为8~20位</span>
      </div>
      <div>
        <p>请再次输入密码</p>
        <input type="password" placeholder="请确认密码" autocomplete="new-password">
        <span>两次密码不一致</span>
      </div>
    </div>
    <div class="is-agreement">
      <input type="checkbox">
      <p>我已阅读并同意</p>
      <span>用户协议</span>
    </div>
    <div class="next-step">
      <button @click="step = 5">注册</button>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import 'animate.css';

const router = useRouter();
/**
 * 步骤切换数据
 * 1: 邮箱昵称
 * 2: 邮箱验证
 * 3: 手机号
 */
const step = ref(1);


const email = ref('1470706154@qq.com');
</script>

<style scoped lang="scss">
  .first-box {
    width: 450px;
    height: 450px;
    background-color: rgba(66, 61, 61, 0.638); 
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    .title {
      color: white;
      font-size: 22px;
      text-align: center;
      margin-top: 45px;
    }
    .input-box {
      width: 300px;
      height: 250px;
      div{
        width: 100%;
        margin-top: 10px;
        p{
          font-size: 15px;
          color: aliceblue;
          margin-left: 10px;
        }
        input{
          width: 100%;
          height: 45px;
          border-radius: 10px;
          margin-top: 6px;
          padding: 0 13px;
        }
        div{
          width: 100%; 
          height: 20px;
          font-size: 13px;
          margin-top: 0;
          color: red;
          display: flex;
          justify-content: center;
        }
      }
    }
    .back-login {
      width: 300px;
      height: 20px;
      display: flex; 
      align-items: center;
      p{
        font-size: 13px;
        color: rgb(196, 210, 255);
      }
      span{
        font-size: 13px;
        color: rgb(0, 123, 255);
        margin-left: 5px;
        cursor: pointer;
      }
    }
    .next-step {
      width: 300px;
      height: 35px;
      margin-top: 40px;
      button{
        width: 100%;
        height: 100%;
        border-radius: 15px;
        border: none;
        font-size: 13px;
        color: aliceblue;
        cursor: pointer;
        background-color: rgb(39, 36, 36);
        transition: all 0.5s;
      }
      button:hover{
        background-color: rgb(110, 105, 105); 
      }
    }
  }
  .second-box{
    width: 450px;
    height: 450px;
    background-color: rgba(66, 61, 61, 0.638);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    .back{
      width: 100%;
      height: 45px;
      color: aliceblue;
      // background-color: aliceblue;
      font-size: 22px;
      display: flex;
      align-items: flex-end;
      padding-left: 20px;
    }
    .title{
      color: white;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
    }
    .input-box{
      width: 330px;
      height: 110px;
      color: aliceblue; 
      font-size: 13px; 
      display: flex;
      flex-direction: column;
      justify-content: center;
      span{
        margin-top: 10px;
      }
      input{
        width: 100%;
        height: 45px;
        border-radius: 10px;
        margin-top: 15px;
        padding: 0 13px;
      }
      div{
        width: 100%;
        height: 10px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        color: red;
      }
    } 
    .send-again{
      width: 330px;
      height: 20px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      p{
        font-size: 13px;
        color: rgb(196, 210, 255);
      }
      span{
        font-size: 13px;
        color: rgb(0, 123, 255);
        margin-left: 5px;
        cursor: pointer;
      }
    }
    .next-step {
      width: 330px;
      height: 35px;
      margin-top: 165px;
      button{
        width: 100%;
        height: 100%;
        border-radius: 15px;
        border: none;
        font-size: 13px;
        color: aliceblue;
        cursor: pointer;
        background-color: rgb(39, 36, 36);
        transition: all 0.5s;
      }
      button:hover{
        background-color: rgb(110, 105, 105); 
      }
    }
  }
  .third-box{
      width: 450px;
      height: 450px;
      background-color: rgba(66, 61, 61, 0.638); 
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
      .back{
        width: 100%;
        height: 45px;
        color: aliceblue;
        font-size: 22px;
        display: flex;
        align-items: flex-end;
        padding-left: 20px;
      }
      .title{
        color: white;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
      }
      .input-box{
        width: 330px;
        height: 330px;
        color: aliceblue; 
        font-size: 13px;
        display: flex;
        flex-direction: column;
        span{
          font-size: 14px;
          margin-top: 10px;
          color: #FFA500;
        }
        .phone{
          width: 100%;
          margin-top: 10px;
          p{
            font-size: 15px;
            color: aliceblue;
            margin-left: 10px;
          }
          input{
            width: 100%;
            height: 45px;
            border-radius: 10px;
            margin-top: 6px;
            padding: 0 13px;
          }
        }
        .birth{
          width: 100%;
          height: 45px;
          margin-top: 10px; 
          p{
            font-size: 15px;
            color: aliceblue;
            margin-left: 10px;
            :deep(.el-icon){
              margin-left: 10px;
            }
          }
          div{
            width: 100%;
            height: 45px;
            display: flex;
            justify-content: space-between;
            input{
              width: 30%;
              height: 100%;
              border-radius: 10px;
              margin-top: 6px;
              padding: 0 13px;
            }
          }
        }
        .sex{
          width: 100%;
          height: 45px;
          margin-top: 40px;
          display: flex;
          div{
            width: 50%;
            height: 100%;
            p{
              font-size: 15px;
              color: aliceblue;
              margin-left: 10px;
            }
            input{
              width: 80%;
              height: 45px;
              border-radius: 10px;
              margin-top: 6px;
              padding: 0 13px;
            }
          }
        }
      }
      .next-step {
        width: 330px;
        height: 35px;
        margin-top: -15px;
        button{
          width: 100%;
          height: 100%;
          border-radius: 15px;
          border: none;
          font-size: 13px;
          color: aliceblue;
          cursor: pointer;
          background-color: rgb(39, 36, 36);
          transition: all 0.5s;
        }
        button:hover{
          background-color: rgb(110, 105, 105); 
        }
      }
  }
  .fourth-box{
    width: 450px;
    height: 450px;
    background-color: rgba(66, 61, 61, 0.638);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    .back{
      width: 100%;
      height: 45px;
      color: aliceblue;
      font-size: 22px;
      display: flex;
      align-items: flex-end;
      padding-left: 20px;
    } 
    .title{
      color: white;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
    }
    .input-box{
      width: 330px;
      height: 200px;
      color: aliceblue;
      div{
        width: 100%;
        margin-top: 10px;
        p{
          font-size: 15px;
          color: aliceblue;
          margin-left: 10px;
        }
        input{
          width: 100%;
          height: 45px;
          border-radius: 10px;
          margin-top: 6px;
          padding: 0 13px;
        }
        span{
          font-size: 12px;
          color: red;
          margin: 33%;
        }
      }
    }  
    .is-agreement{
      width: 330px;
      height: 20px;
      margin-top: 30px;
      margin-left: 25px;
      display: flex;
      input{
        width: 17px;
        height: 17px;
        margin-top: 3px;
      }
      p{
        font-size: 13px;
        color: aliceblue;
        margin-left: 10px;
      }
      span{
        font-size: 13px;
        color: rgb(0, 123, 255);
        margin-left: 5px;
        text-decoration: dashed;
      }
    }
    .next-step {
      width: 330px;
      height: 35px;
      margin-top: 60px;
      button{
        width: 100%;
        height: 100%;
        border-radius: 15px;
        border: none;
        font-size: 13px;
        color: aliceblue;
        cursor: pointer;
        background-color: rgb(247, 132, 0);
        transition: all 0.5s;
      }
    }
  }
</style>