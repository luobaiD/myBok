<template>
  <div class="login-box">
    <div class="login-title">
      <p>登录</p>
    </div>
    <div class="login-id">
      <p>账号</p>
      <input type="text" v-model="userData[0].content" placeholder="邮箱,手机号,自定义账号" autocomplete="off" ref="account"/>
    </div>
    <div class="login-password">
      <p>密码</p>
      <input type="password" v-model="userData[1].content" placeholder="请输入密码" autocomplete="new-password" ref="password"/>
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
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus'
  import { postlogin } from '@/api/login/login';

  const router = useRouter()
  const userData = ref([
    {
      content: '',
      name: '账号',
      type: 'email'
    },
    {
      content: '',
      name: '密码',
      type: 'password'
    }
  ]) 



  /**
   * 登录
   */
  const handleLogin =async () => {
    const idpassword = {
      email: '',
      password: ''
    }
    // 检查是否有数据未填写
    for(let i=0;i < userData.value.length;i++){
      if(!userData.value[i].content){
        ElMessage({
          showClose: true,
          message:  `请输入${userData.value[i].name}`,
          type:'error',
          center: true,
          duration: 2000
        })
        return
      }
      idpassword[userData.value[i].type as keyof typeof idpassword] = userData.value[i].content
    } 
    try {
      // 调用 postlogin 函数进行登录请求
      const res:any = await postlogin(idpassword);
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
      }
      
    } catch (error) {
      // 捕获并处理异常，给出错误提示
      console.log(error);
      ElMessage({
        showClose: true,
        message: '登录过程中出现错误，请稍后重试',
        type: 'error',
        center: true,
        duration: 3000
      });
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
</script>


<style scoped lang=scss>
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