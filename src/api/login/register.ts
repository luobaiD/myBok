import http from "../index"


//注册
export const register = async (registerData: any) => {
  try{
    const response = await http.post(`/register`, registerData);
  } catch{
    console.error('请求错误，请稍后重试');
  }
}
