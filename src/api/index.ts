// src/api/base.ts
import axios from 'axios';

const getToken = () => {
  if (!localStorage.getItem("token")) {
    return ''
  }else{
    return localStorage.getItem("token");
  }
};
// 创建一个 axios 实例
const http = axios.create({
  baseURL: import.meta.env.VITE_API_NODE_BASE_URL,
  headers: {
    'token': getToken(), 
  },
  timeout: 10000 * 60 *60, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  async (config:any) => {
    // 可以在这里添加一些请求前的处理，如添加请求头
    return config;
  },
  (error) => {
    return Promise.reject(`请求错误: ${error}`);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 可以在这里对响应数据进行一些处理
      if(response.status!==200){
        return Promise.reject("http错误");
      }

      let code = response.data.code;
      if(code === 401 || code === 40104 ||code === 40105){
        throw new Error("登录过期");
      }

      if(code!==200){
         throw new Error(response.data.msg);
        ;
      }
    console.log(response.data);
    return response.data;
  },
  (error) => {
    // 可以在这里对错误进行统一处理
    return Promise.reject(error);
  }
);

export default http;