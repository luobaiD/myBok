# 接口文档

# user相关接口

## 注册接口
- 接口地址：**/register**
- 请求方式：**POST**

### 请求参数
| 参数          | 类型    | 是否必填 | 描述   |
|---------------|---------|----------|--------|
| email         | string  | 是       | 用户邮箱 |
| nickname      | string  | 是       | 用户昵称 |
| phone_number  | string  | 是       | 手机号码 |
| password      | string  | 是       | 用户密码 |

### 请求参数示例
```{
  {
  "email": "test@supertest.com",
  "nickname": "test1",
  "phone_number": "18800008998",
  "password": "123456"
}
```



### 响应示例

```
{
  "code": 200,
  "msg": "success",
  "data": {
    "results": {
      "fieldCount": 0,
      "affectedRows": 1,
      "insertId": 15,
      "info": "",
      "serverStatus": 2,
      "warningStatus": 0,
      "changedRows": 0
    }
  }
}
```



---

## 登录接口
- 接口地址：**/login**
- 请求方式：**POST**

### 请求参数
| 参数     | 类型    | 是否必填 | 描述   |
|----------|---------|----------|--------|
| email    | string  | 是       | 用户邮箱 |
| password | string  | 是       | 用户密码 |

### 请求参数示例

```
{
  "email": "test@test.com",
  "password": "123456"
}
```





### 响应示例

```


{
  "code": 200,
  "msg": "success",
  "data": {
    "login_token": "a0151db81e9f622719e1b66ca57e7d42",
    "userInfo": {
      "id": 12,
      "username": "test",
      "email": "test@test.com",
      "password": null,
      "nickname": "test",
      "profile_picture": null,
      "bio": null,
      "role": "user",
      "status": "active",
      "phone_number": "18800008998",
      "address": null,
      "created_at": "2025-02-19T09:26:54.000Z",
      "updated_at": "2025-02-19T09:26:54.000Z",
      "last_login": null,
      "remember_token": null
    }
  }
}
```



---

## 登出接口
- 接口地址：**/logout**
- 请求方式：**POST**

### 请求参数
| 参数        | 类型    | 是否必填 | 描述   |
|-------------|---------|----------|--------|
| login_token | string  | 是       | 用户登录成功后返回的token |

### 请求参数示例
```
{
  "login_token": "a0151db81e9f622719e1b66ca57e7d42"
}
```



### 响应示例

```
{
  "code": 200,
  "msg": "success",
  "data": "登出成功"
}
```



