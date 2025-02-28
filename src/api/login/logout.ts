import http from "..";

//登出
export const postlogout = async (tokenData: any) => {
  try{
    const response = await http.post(`/logout`, tokenData);
    return response;
  } catch(err){
    return err;
  }
}