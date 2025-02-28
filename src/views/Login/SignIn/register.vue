<template>
  <!-- 邮箱昵称 -->
  <div class="first-box animate__animated animate__fadeIn" v-show="step === 1">
    <div class="title">创建您的账户</div>
    <div class="input-box">
      <div>
        <p>邮箱</p>
        <input type="text" v-model="userCreate.email" placeholder="email" autocomplete="off-unique-value">
        <div><span v-show="!isemail">请输入正确的邮箱格式</span></div>   
      </div>
      <div>
        <p>昵称</p>
        <input type="text" v-model="userCreate.nickname" placeholder="输入你的昵称" autocomplete="off-unique-value">
        <div><span v-show="!isnickname">用户名必须为2~8个字符</span></div>
      </div>
    </div>
    <div class="back-login">
      <p>已有账户?</p>
      <span @click="router.push('/login')">登录</span>
    </div>
    <div class="next-step">
      <button @click="firstBt"  
              :disabled="!isFirst"
              :style="{background: isFirst? '#FF8C00': '#CCCCCC',cursor: isFirst? 'pointer' : 'not-allowed'}">
        下一步
      </button>
    </div>
  </div>

  <!-- 邮箱验证 -->
  <div class="second-box animate__animated animate__fadeIn" v-show="step === 2">
    <div class="back" @click="step = 1">
      <el-icon><Back /></el-icon>
    </div>
    <div class="title">我们向您发送了一个验证码</div>
    <div class="input-box">
      <span>{{ `在下面输入${userCreate.email}的验证码` }}</span>
      <input type="text" v-model="userCreate.verify" placeholder="请输入验证码" autocomplete="off">
      <div><span v-show="isverify">验证码格式为6位</span></div>
    </div>
    <div class="send-again">
      <p>没有收到邮件?</p>
      <span v-show="issend" @click="startCountdown">重新发送</span>
      <span v-show="!issend">{{ verifyTime }}秒后发送</span>
    </div>
    <div class="next-step">
      <button @click="secondBt"
              :disabled="!issecond"
              :style="{background: issecond? '#FF8C00': '#CCCCCC',cursor: issecond? 'pointer' : 'not-allowed'}">
        下一步
      </button>
    </div>
  </div>

  <!-- 个人联系方式 -->
  <div class="third-box animate__animated animate__fadeIn" v-show="step === 3">
    <div class="back" @click="step = 2">
      <el-icon><Back /></el-icon>
    </div>
    <div class="title">设置您的个人信息</div>
    <div class="input-box">
      <span>* 该页内容非必填项，您可以选择跳过</span>
      <div class="phone">
        <p>手机号</p>
        <input type="tel" 
              v-model="userCreate.phone" 
              autocomplete="off" 
              placeholder="请输入手机号" 
              @input="handlePhoneInput"
              maxlength="11">
      </div>
      <div class="birth">
        <p>请选择出生日期 
          <el-icon><Calendar /></el-icon>
        </p>
        <div>
          <input type="text" v-model="year" placeholder="年">
          <input type="text" v-model="month" placeholder="月">
          <input type="text" v-model="day" placeholder="日">
        </div>
      </div>
      <div class="redundant">
        <div class="sex">
          <p>性别</p>
          <select v-model="userCreate.sex">
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <div class="job">
          <p>你当前职业是?</p>
          <input v-model="userCreate.job" type="text">
        </div>
      </div>
    </div>
    <div class="next-step">
      <button @click="thirdBt">{{ '下一步' }}</button>
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
        <input type="password" v-model="userCreate.password" placeholder="请输入密码" autocomplete="new-password">
        <div class="error">
          <span v-show="creatPassword">{{ passwordError }}</span>
        </div>
      </div>
      <div class="error">
        <p>请再次输入密码</p>
        <input type="password" v-model="userCreate.password2" placeholder="请确认密码" autocomplete="new-password">
        <div class="error">
          <span v-show="!ispassword">两次密码不一致</span>
        </div>
      </div>
    </div>
    <div class="is-agreement">
      <input type="checkbox" v-model="userCreate.isAgreement" @click="console.log(userCreate.isAgreement)">
      <p>我已阅读并同意</p>
      <span>用户协议</span>
    </div>
    <div class="next-step">
      <button @click="sendregister">注册</button>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { ref, computed,watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import 'animate.css';
import { postCaptcha, postCaptchaVerify } from '../../../api/login/chptCha';
import { register } from '../../../api/login/register'


const step = ref(1);
const router = useRouter();
interface Data {
  email: string;
  nickname: string;
  verify: string;
  phone: string | null; 
  birthday: string | null;
  sex: 'male' | 'female' | 'secrecy';
  job: string | null;
  password: string;
  password2: string;
  isAgreement: boolean;
}
const userCreate = ref<Data>({
  email: '',
  nickname: '',
  verify:'',
  phone: null,
  birthday: null,
  sex:'secrecy',
  job: null,
  password: '',
  password2: '',
  isAgreement: false,
})

//#region 1
const isemail = ref(false);
const isnickname = ref(false);
watchEffect(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  isemail.value = emailRegex.test(userCreate.value.email);
});
watchEffect(() => {
  if(userCreate.value.nickname.length >= 2 && userCreate.value.nickname.length <= 8){
    isnickname.value = true; 
  }else{
    isnickname.value = false;
  }
})

let isFirst = ref(false)

watchEffect(() => {
  isFirst.value = isemail.value!== false && isnickname.value!== false;
});

// 是否发送验证码
const issend = ref(false);
// 验证码倒计时
let verifyTime = ref(120);

const firstBt = async () => {
  step.value = 2;
  startCountdown()
  // 验证邮箱数据
  const data = {
    "email": `${userCreate.value.email}`,
  }
  // 发送验证码请求
  try {
    // 调用 postCaptcha 函数进行登录请求
    const res:any = await postCaptcha(data);
      if(res.code == 200){
        ElMessage({
          showClose: true,
          message: '验证码发送成功,只有两分钟时效,请及时注册',
          type: 'success', 
          center: true,
          duration: 3000
        })
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
//#endregion

//#region 2
const isverify = ref(false);
watchEffect(() => {
  if(userCreate.value.verify.length === 6){
    isverify.value = false;
  }else{
    isverify.value = true;
  }
})
// 验证码倒计时
const Countdown = () => {
  let timer = setInterval(() => {
    if(verifyTime.value === 0){
      clearInterval(timer);
      issend.value = true;
      verifyTime.value = 120;
    }else{
      verifyTime.value--;
    }
  }, 1000);
}
// 发送验证码
const startCountdown = () => {
  issend.value = false;
  if(verifyTime.value === 120){
    Countdown();
  }else{
    console.log('验证码发送间隔太短，请稍后重试');
  }
}
// 检查验证码格式
const issecond = ref(false);
watchEffect(() => {
  issecond.value = isverify.value == false; 
})

// 验证码校验并跳转下一页面
const secondBt = async () => {
  const data = {
    "email": `${userCreate.value.email}`,
    "emailcode": `${userCreate.value.verify}`
  }
  try {
    // 调用 postCaptchaVerify 函数进行登录请求
    const res:any = await postCaptchaVerify(data);
    if(res.code == 200){
      ElMessage({
        showClose: true,
        message: '验证码发送成功,只有两分钟时效,请及时注册',
        type: 'success', 
        center: true,
        duration: 3000
      })
    }
    step.value = 3;
  } catch (error) {
    console.log('验证失败');
  }
}
//#endregion

//#region 3
// 处理手机号输入
const handlePhoneInput = () => {
  if (userCreate.value.phone !== null) {
    userCreate.value.phone = userCreate.value.phone.replace(/[^\d]/g, '');
    if (userCreate.value.phone === '') {
      userCreate.value.phone = null;
    }
  }
};
let year = ref('')
let month = ref('')
let day = ref('')

const thirdBt = () => {
  //处理日期
  const validYear = year.value.padStart(4, '0');
  const validMonth = month.value.padStart(2, '0');
  const validDay = day.value.padStart(2, '0');

  if (validYear && validMonth && validDay) {
    userCreate.value.birthday = `${validYear}-${validMonth}-${validDay}`;
  } else {
    userCreate.value.birthday = null;
  }
  step.value = 4;
}
//#endregion

//#region 4
const creatPassword = ref(false);
const ispassword = ref(false);
let passwordError = ref('密码格式为8~20位')

// 密码校验规则
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
  return passwordRegex.test(password); 
}
watchEffect(() => {
  const data = userCreate.value.password
  if(data.length >= 8 && data.length <= 20){
    if(!validatePassword(data)){
      passwordError.value = '密码必须包含字母和数字'
    }else{
      creatPassword.value = false;
    }
  }else{
    creatPassword.value = true;
    passwordError.value = '密码格式为8~20位'
  }
})
watchEffect(() => {
  if(userCreate.value.password === userCreate.value.password2){
    ispassword.value = true; 
  }else{
    ispassword.value = false;
  }
})

// 注册
const sendregister = async () => {
  const data = {
    "email": userCreate.value.email,
    "nickname": userCreate.value.nickname,
    "phone_number": userCreate.value.phone,
    "password": userCreate.value.password,
    "birthday": userCreate.value.birthday,
    "gender": userCreate.value.sex,
    "job": userCreate.value.job
  }
  // 调用注册接口
  const response = register(data).then(res => {
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
//#endregion

onMounted(() => {

})
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
        transition: all 0.5s;
      }
      button:hover{
        background-color: rgb(39, 36, 36);
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
            display: flex;
            align-items: center;
            :deep(.el-icon){
              margin-left: 10px;
              color: #FFA500;
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
        .redundant{
          width: 100%;
          height: 45px;
          margin-top: 40px;
          display: flex;
          div{
            height: 100%;
            p{
              font-size: 15px;
              color: aliceblue;
              margin-left: 10px;
            }
            input{
              height: 45px;
              border-radius: 10px;
              margin-top: 6px;
              padding: 0 13px;
            }
          }
          .sex{
            flex-basis: 40%;
            select{
              width: 85%;
              height: 45px;
              border-radius: 10px;
              margin-top: 6px;
              padding: 0 13px;
            }
          }
          .job{           
            flex-basis: 70%;
            input{
              width: 100%;
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
          background-color: #FF8C00;
          transition: all 0.5s;
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
          margin-top: 5px;
          padding: 0 13px;
        }
        .error{
          width: 100%;
          height: 10px;
          margin: 0;
          display: flex;
          justify-content: center;
          span{
            font-size: 12px;
            color: red;
          }
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