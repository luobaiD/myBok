<template>
  <div class="login-box" v-show="!isSignIn">
    <div class="login-title">
      <p>登录</p>
    </div>
    <div class="login-id">
      <p>账号</p>
      <input type="text" v-model="loginStore().loginGo.account" placeholder="邮箱,手机号,自定义账号" autocomplete="off"/>
    </div>
    <div class="login-password">
      <p>密码</p>
      <input type="password" v-model="loginStore().loginGo.password" placeholder="请输入密码" autocomplete="off"/>
    </div>
    <div class="login-edit">
      <p>忘记密码 ?</p>
    </div>
    <div class="login-button">
      <button @click="handleLogin">登录</button>
      <button @click="handleGuest">游客</button>
      <button @click="handleRegister">注册</button>
    </div>
  </div>
  <router-view v-show="isSignIn"></router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { loginStore } from '@/stores/counter';
import { ElMessage } from 'element-plus'


const router = useRouter()
const isSignIn = ref(false)
/**
 * @param {handleLogin} 登录
 */
const handleLogin = () => {
  localStorage.setItem('account', loginStore().loginGo.account)
  localStorage.setItem('password', loginStore().loginGo.password)
  // 处理登录逻辑
  console.log(loginStore().loginGo.account, loginStore().loginGo.password)
  loginStore().loginGo.isUser = true
  if(loginStore().loginGo.isUser === true){
    router.push('/home')
  }
}
/**
 * @param {handleGuest} 游客
 */
const handleGuest = () => {
  // 处理游客逻辑
  localStorage.setItem('account', '游客')
  localStorage.setItem('password', '游客')
  loginStore().loginGo.isUser = false
  ElMessage({
    showClose: true,
    message: '您现在进入游客模式，仅可以进行浏览他人博客内容，无法进行创建操作',
    type: 'success',
    center: true,
    duration: 3000
  })
  router.push('/coge')
}
/**
 * @param {handleRegister} 注册
 */
const handleRegister = () => {
  // 处理注册逻辑
  console.log('注册')
  isSignIn.value = !isSignIn.value
  router.push('/login/sign')
}

onMounted(() => {
  if(localStorage.getItem('account')){
    loginStore().loginGo.account = localStorage.getItem('account')!
  }else{
    loginStore().loginGo.account = ''
  }

  if(localStorage.getItem('password')){
    loginStore().loginGo.password = localStorage.getItem('password')!
  }else{
    loginStore().loginGo.password = ''
  }
})
</script>

<style scoped >
  .login-box{
    width: 450px;
    height: 300px;
    user-select: none;
    border-radius: 10px;
    background-color: #b3c0d1;
    display: flex;
    flex-direction: column;
    .login-title{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      p{
        font-size: 30px;
        font-weight: bold;
      }
    }
    .login-id{
      width: 100%;
      height: 50px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      p{
        font-size: 20px;
        margin-left: 40px;
      }
      input{
        width: 300px;
        height: 30px;
        border: none;
        border-radius: 5px;
        padding-left: 10px;
        margin-left: 20px;
      }
      input:focus-visible{
        outline: none;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
    }
    .login-password{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      p{
        font-size: 20px;
        margin-left: 40px;
      }
      input{
        width: 300px;
        height: 30px;
        border: none;
        border-radius: 5px;
        padding-left: 10px;
        margin-left: 20px;
      }
      input:focus-visible{
        outline: none;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
    }
    .login-edit{
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: flex-end;
      p{
        font-size: 12px;
        margin-right: 50px;
      }
      p:hover{
        color: #e3690c;
        cursor: pointer;
      }
    }
    .login-button{
      width: 100%;
      height: 50px;
      padding-left: 50px;
      padding-right: 50px;
      display: flex;
      justify-content: space-around;
      button{
        width: 80px;
        height: 30px;
        border: none;
        background-color: #ecf1f3;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
      button:hover{
        background-color: #76b6a8;
        color: #fff;
        cursor: pointer;
        transition: all 0.5s ease;
      }
      button:active{
        box-shadow: none;
        transition: all 0.2s ease; 
      }
    }
  }
</style>