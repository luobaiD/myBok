<template>
  <div class="signIn-box">
    <div class="signIn-title">
      <p>注册</p>
    </div>
    <div class="signIn-email inputBox">
      <input type="text" v-model="email" required/>
      <span>请输入你的邮箱</span>
    </div>
    <div class="signIn-idName inputBox">
      <input type="text" v-model="idName" required/>
      <span>请创建你的昵称</span>
    </div>
    <div class="signIn-phone inputBox">
      <input type="text" v-model="phone" required autocomplete="off"/>
      <span>请输入你的手机号</span>
    </div>
    <div class="signIn-password inputBox">
      <input type="password" v-model="password" required autocomplete="on"/>
      <span>请输入你的密码</span>
    </div>
    <div class="signIn-ispassword inputBox">
      <input type="password" v-model="ispassword" required autocomplete="on"/>
      <span>请确认你的密码</span>
    </div>
    <div class="signIn-button">
      <button>返回</button>
      <button @click="handleGuest">游客</button>
      <button>注册</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loginStore } from '@/stores/counter';
import '@/assets/Css/inputsCss.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const email = ref('')
const phone = ref('')
const password = ref('')
const ispassword = ref('')
const idName = ref('')


const router = useRouter()
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
</script>

<style scoped>
  .signIn-box {
    width: 450px;
    height: 500px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #ffffff;
    user-select: none;
    display: flex;
    flex-direction: column;
    .signIn-title {
      width: 100%;
      height: 50px;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .signIn-button {
      width: 100%;
      height: 50px;
      display: flex;
      margin-top: 25px;
      padding: 0 20px;
      justify-content: space-around;
      button {
        width: 70px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
      button:hover{
        background-color: #76b6a8;
        color: #fff;
        transition: all 0.5s ease;
      }
      button:active{
        box-shadow: none;
        transition: all 0.2s ease; 
      }
    }
  }
</style>