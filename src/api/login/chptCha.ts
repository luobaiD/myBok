import http from "..";

// 验证码
export const postCaptcha = async (captcha: any) => {
  try {
    const response = await http.post(`/sendcode`, captcha);
    return response;
  } catch (err) {
    return err;
  }
};

// 校验验证码
export const postCaptchaVerify = async (captcha: any) => {
  try {
    const response = await http.post(`/verifycode`, captcha);
    return response;
  } catch (err) {
    return err;
  }
};