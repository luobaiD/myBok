// src/api/base.ts
import axios from 'axios';

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: import.meta.env.liu200222, // 假设你在 .env 文件中配置了 API 的基础 URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加一些请求前的处理，如添加请求头
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 可以在这里对响应数据进行一些处理
    return response.data;
  },
  (error) => {
    // 可以在这里对错误进行统一处理
    return Promise.reject(error);
  }
);

export default instance;