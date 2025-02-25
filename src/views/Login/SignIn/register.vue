<template>
  <div class="animate__animated animate__fadeIn animate__zoomIn signIn-box">
    <div class="signIn-title">
      <p>注册</p>
    </div>
    <div class="inputBox" v-for="item in registerData">
      <input :type="item.type" v-model="item.content" required :autocomplete="item.autocomplete" />
      <span>{{item.name}}</span>
    </div>
    <div class="signIn-button">
      <button @click="router.back()">返回</button>
      <button @click="handleGuest">游客</button>
      <button @click="handleRegister">注册</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import 'animate.css';
// import '@/assets/Css/inputsCss.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { register } from '../../../api/login/register'

const registerData = ref([
  {
    content: '',
    text: '请输入你的邮箱',
    name: '邮箱',
    type: 'emails',
    autocomplete: 'off'
  },
  {
    content: '',
    text: '请创建你的昵称',
    name: '昵称',
    type: 'nickname',
    autocomplete: 'off'
  },
  {
    content: '',
    text: '请输入手机号',
    name: '手机号',
    type: 'phone',
    autocomplete: 'off'
  },
  {
    content: '',
    text: '请输入密码',
    name: '密码',
    type: 'password',
    autocomplete: 'new-password'
  },
  {
    content: '',
    tetx: '再次输入密码',
    name: '确认密码',
    autocomplete: 'off'
  }
])


interface Data {
  email: string,
  nickname: string,
  phone_number: string,
  password: string,
}
const data = ref<Data>({
  email:'',
  nickname:'',
  phone_number:'',
  password:''
})
const router = useRouter()
/**
 * 游客登录
 */
 const handleGuest = () => {
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
 * 注册
 */
const handleRegister = async () => {
  // 检查是否有数据未填写
  for(let i=0;i < registerData.value.length;i++){
    if(!registerData.value[i].content){
      ElMessage({
        showClose: true,
        message:  `请输入${registerData.value[i].name}`,
        type:'error',
        center: true,
        duration: 2000
      })
      return
    }
  }
  // 检查两次密码是否一致
  if(registerData.value[3].content !== registerData.value[4].content){
    ElMessage({
      showClose: true,
      message:  `两次密码不一致`,
      type:'error',
      center: true,
      duration: 2000
    })
    return
  }else{
    let a = 0
    for (const i in data.value) {
      data.value[i as keyof Data] = registerData.value[a].content
      a++
    }
    // 调用注册接口
    const response = register(data.value).then(res => {
      ElMessage({
        showClose: true,
        message:  `注册成功`,
        type:'success',
        center: true,
        duration: 2000
      })
      router.push('/login')
    }).catch(err => {
      ElMessage({
        showClose: true,
        message:  `注册失败`,
        type:'error',
        center: true,
        duration: 2000
      })
    })
    
    
  }
}
</script>

<style scoped lang="scss">
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
    .inputBox{
      margin: 50px auto;
      position: relative;
      width: 70%;
      height: 50px;
      margin-top: 15px;
      margin-bottom: 0;
      input{
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1em;
        outline: none;
      }
      span{
        position: absolute;
        left: 0;
        top: 0;
        padding: 10px;
        font-size: 1em;
        pointer-events: none;
        color: #ccc;
        transition: all 0.5s;
      }
      input:valid ~ span,
      input:focus ~ span{
        color: orange;
        transform: translateX(10px) translateY(-7px);
        font-size: 0.65em;
        padding: 0 10px;
        background-color: #fff;
      }
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