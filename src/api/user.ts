// src/api/user.ts
import baseApi from './index';

// 定义用户登录接口
export const login = (data: { account: string; password: string }) => {
  return baseApi.post('/user/login', data);
};

// 定义获取用户信息接口
export const getUserInfo = () => {
  return baseApi.get('/user/info');
};