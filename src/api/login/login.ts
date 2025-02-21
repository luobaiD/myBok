import http from "..";

//登录
export const postlogin = async (registerData: any) => {
  try{
    const response = await http.post(`/login`, registerData);
    return response;
  } catch(err){
    return err;
  }
}
