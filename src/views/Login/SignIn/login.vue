<template>
  <div class="animate__animated animate__fadeIn login-box ">
    <div class="login-title">
      <p>login</p>
    </div>
    <div class="login-id">
      <p>账号</p>
      <input type="text" v-model="userData[0].content" placeholder="邮箱,手机号,自定义账号" autocomplete="off" ref="account" @blur="handleAccountBlur"/>
    </div>
    <div class="error-hint">
      <p  v-show="userData[0].state">{{ userData[0].error }}</p>
    </div>
    <div class="login-password">
      <p>密码</p>
      <input type="password" v-model="userData[1].content" placeholder="请输入密码" autocomplete="new-password" ref="password" @blur="handlePasswordBlur"/>
    </div>
    <div class="error-hint">
      <p v-show="userData[1].state">{{ userData[1].error }}</p>
    </div>
    <!-- <div class="login-edit">
      <p>忘记密码 ?</p>
    </div> -->
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
  import 'animate.css';
  import { lengthProvide, validateEmail } from '../../../utils/inputProvide';

  const router = useRouter()
  const userData = ref([
    {
      content: '',
      name: '账号',
      type: 'email',
      state: false,
      error: '请输入正确的邮箱格式'
    },
    {
      content: '',
      name: '密码',
      type: 'password',
      state: false,
      error: '密码长度应在8-12位之间'
    }
  ]) 
  
  /**
   * 账号失焦验证
   */
  const handleAccountBlur = () => {
    const account = userData.value[0].content;
    // if(lengthProvide(account, 18, 12)){
    //   userData.value[0].state = true;
    //   userData.value[0].error = '邮箱的正确位数应为12~18位'
    // }else{
    //   userData.value[0].state = false;
    // }
    // if(validateEmail(account)){
    //   console.log(account);
    //   userData.value[0].state = true;
    //   userData.value[0].error = '请输入正确的邮箱格式'
    // }else{
    //   console.log('邮箱格式正确');
    //   userData.value[0].state = false;
    // }
  }

  /**
   * 密码失焦验证
   */
  const handlePasswordBlur = () => {
    // const password = userData.value[1].content;
    // const isValid = lengthProvide(password, 12, 8);
    
    // userData.value[1].state = isValid;
    // console.log('当前密码状态：',userData.value[1].state);
  }

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
    background-color: #82a0c6a8;
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
        color: #fff;
        font-size: 33px;
        font-weight: bold;
      }
    }
    .login-id{
      width: 100%;
      height: 50px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      p{
        color: #fff;
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
        color: #fff;
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
    .error-hint{
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        font-size: 12px;
        color: red;
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
      margin-top: 40px;
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