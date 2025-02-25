/**
 * 长度规范
 * @param str 需要校验的字符串
 * @param min 最小长度
 * @param max 最大长度
 */
export const lengthProvide = (str: string, max: number, min: number = 0):boolean => {
  // 添加空值处理
  if (!str) return true;
  // 添加类型检查
  if (typeof str !== 'string') return true;
  const lon = str.length >= min && str.length <= max
  // 返回验证结果
  return !lon;
};

/**
 * 邮箱验证
 */
export const validateEmail = (email: string): boolean => {
  // 增强版正则表达式（支持国际化域名）
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/;
  
  // 基础格式验证
  if (!emailRegex.test(email)) return false;

  // 额外业务规则校验
  const [localPart, domain] = email.split('@');
  
  // 本地部分限制
  if (localPart.length > 64) return false; // 本地部分最大长度
  if (/\.{2,}/.test(localPart)) return false; // 禁止连续点号
  if (/^\.|\.$/.test(localPart)) return false; // 禁止开头结尾点号

  // 域名限制
  if (domain.length > 253) return false; // 域名最大长度
  if (/(\d{1,3}\.){3}\d{1,3}/.test(domain)) { // IP地址格式校验
    return /^\[?(\d{1,3}\.){3}\d{1,3}\]?$/.test(domain);
  }

  return true;
};


/**
 * 验证规则
 */
const validationRules = {
  email: [
    {
      check: (value: string) => !!value,
      message: '邮箱不能为空'
    },
    {
      check: (value: string) => value.length <= 24,
      message: '邮箱长度不能超过24位'
    },
    {
      check: (value: string) => validateEmail(value),
      message: '邮箱格式不正确'
    },
    {
      check: (value: string) => {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return reg.test(value);
      },
      message: '邮箱格式不正确'
    }
  ],
  password: [
    {
      check: (value: string) => !!value,
      message: '密码不能为空'
    },
    {
      check: (value: string) => value.length >= 8,
      message: '密码至少8位'
    },
    {
      check: (value: string) => value.length <= 16,
      message: '密码最多16位'
    }
  ]
}