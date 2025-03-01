<template>
  <div class="animate__animated animate__fadeIn login-box ">
    <div class="login-title">
      <p>login</p>
    </div>
    <div class="login-account">
      <!-- 账号 -->
      <div class="login-email">
        <div class="text">
          <span>账号</span>
          <input type="text" placeholder="请输入邮箱" 
                v-model="userData[0].content" 
                autocomplete="off-unique-value"
                @input="emailwatch = true"
                @blur="emailwatch = true"
          >
        </div>
        <div class="error">
          <span v-show="!isemail && emailwatch">请输入正确的邮箱</span>
        </div>
      </div>
      <!-- 密码 -->
      <div class="login-password">
        <div class="text">
          <span>密码</span>
          <input type="password" placeholder="请输入密码" 
                v-model="userData[1].content" 
                @input="passwordwatch = true"
                @blur="passwordwatch = true"
                autocomplete="new-password">
        </div>
        <div class="error">
          <span v-show="ispassword && passwordwatch">请输入8-16位的密码</span>
        </div>
      </div>
    </div>
    <!-- <div class="login-edit">
      <p>忘记密码 ?</p>
    </div> -->
    <div class="login-button">
      <button @click="handleLogin" class="login-bt">登录</button>
      <span>or</span>
      <div class="notlogin-bt">
        <button @click="handleGuest">游客</button>
        <button @click="handleRegister">注册</button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus'
  import { postlogin } from '@/api/login/login';
  import 'animate.css';
  import { lengthProvide, validateEmail } from '../../../utils/inputProvide';

  const router = useRouter()
  const userData = ref([
    {
      content: '',
      name: '账号',
      type: 'email',
      state: true,
      error: '请输入正确的邮箱格式'
    },
    {
      content: '',
      name: '密码',
      type: 'password',
      state: true,
      error: '密码长度应在8-12位之间'
    }
  ]) 
  
  const emailwatch = ref()
  const passwordwatch = ref()
  const isemail = ref(false)
  const ispassword = ref(false)
  watchEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailwatch.value){
      isemail.value = emailRegex.test(userData.value[0].content); 
    }
  });
  watchEffect(() => {
    if(passwordwatch.value){
      ispassword.value = lengthProvide(userData.value[1].content, 8, 16); 
    }
  })

  /**
   * 登录
   */
  const handleLogin = async () => {
    if (isemail.value && ispassword.value) {
      const idpassword = {
        email: userData.value[0].content,
        password: userData.value[1].content
      }
      try {
        // 调用 postlogin 函数进行登录请求
        const res:any = await postlogin(idpassword);
        console.log(res);
        if(res.code == 200){
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('account', res.data.userInfo.email)
          ElMessage({
            showClose: true,
            message: '登录成功',
            type: 'success', 
            center: true,
            duration: 2000
          })
          router.push('/') 
        }else if(res.code == 40101){
          ElMessage({
            showClose: true,
            message: res.msg,
            type:'error',
            center: true,
            duration: 2000
          }) 
        }else if(res.code == 40102){
          ElMessage({
            showClose: true,
            message: res.msg,
            type:'error',
            center: true,
            duration: 2000
          }) 
        }
      } catch (error) {
        ElMessage({
          showClose: true,
          message: '登录失败,请检查网络连接',
          type: 'error',
          center: true,
          duration: 3000
        });
      }
    } else {
      ElMessage({
        showClose: true,
        message: '请输入正确的邮箱和密码',
        type: 'error',
        center: true,
        duration: 3000 
      })
    }
  }

  /**
   * 游客
   */
  const handleGuest = () => {
    ElMessage({
      showClose: true,
      message: '您进入了特殊区域',
      type: 'success',
      center: true,
      duration: 3000
    })
    router.push('/coge')
  }

  /**
   * 注册路由跳转
   */
  const handleRegister = () => {
    router.push('/login/sign')
  }

onMounted(() => {
 
})
</script>


<style scoped lang=scss>
  .login-box{
    width: 450px;
    height: 420px;
    user-select: none;
    border-radius: 10px;
    background-color: rgba(66, 61, 61, 0.638);
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-title{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      p{
        color: #fff;
        font-size: 33px;
        font-weight: bold;
      }
    }

    .login-account{
      width: 80%;
      height: 200px;
      display: flex; 
      flex-direction: column;
      .login-email{
        width: 100%;
        height: 60px;
        margin-top: 20px;
        display: flex;
        flex-direction: column; 
        .text{
          width: 100%;
          height: 40px;
          border-radius: 20px;
          span{
            font-size: 20px;
            color: aliceblue;
            margin-right: 20px;
          }
          input{
            width: 80%;
            height: 100%;
            border-radius: 10px; 
            font-size: 15px;
            padding-left: 20px;
            padding-right: 20px;
            outline: none;
          }
        }
        .error{
          width: 100%;
          height: 20px;
          color: red;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 20px;
        }
      }
      .login-password{
        width: 100%;
        height: 60px;
        margin-top: 20px;
        display: flex; 
        flex-direction: column;
        .text{
          width: 100%;
          height: 40px;
          border-radius: 20px;
          span{
            font-size: 20px;
            color: aliceblue;
            margin-right: 20px;
          }
          input{
            width: 80%;
            height: 100%;
            border-radius: 10px; 
            font-size: 15px;
            padding-left: 20px;
            padding-right: 20px;
            outline: none;
          }
        }
       .error{
          width: 100%;
          height: 20px;
          color: red;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 20px;
        }
      }
    }


    .login-button{
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .login-bt{
        width: 80%;
        height: 40px;
        border-radius: 20px;
        border: none;
      }
      span{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
      }
      .notlogin-bt{
        width: 80%;
        height: 43px;
        display: flex;
        justify-content: space-between;
        button{
          width: 45%;
          height: 100%;
          border-radius: 20px;
        }
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