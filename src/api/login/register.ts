import http from "../index"


//注册
export const register = async (registerData: any) => {
  try{
    const response = await http.post(`/register`, registerData);
    return response;
  } catch(error){
    throw error;
  }
}
