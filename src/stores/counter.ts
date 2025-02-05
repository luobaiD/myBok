import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const loginStore = defineStore('counter', () => {
  interface LoginGoTs{
    account:string;
    password:string;
    isUser:boolean;
  }
  const loginGo:LoginGoTs = {
    account: '',
    password: '',
    isUser: false,
  }

  return { loginGo }
})
