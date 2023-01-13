# <center>通过 API 管理租户</center>

首先，您需要在 Authing 控制台获取用户池 ID 和密钥。

<img src="https://files.authing.co/authing-console/tenant/quick-start/11.png?flush=0105-1" width="100%"/>

然后获取 accessToken：

```javascript
const token = fetch("https://api.authing.cn/api/v3/get-management-token", {
  data: {
    accessKeyId: "用户池 ID",
    accessKeySecret: "用户池秘钥",
  },
  method: "POST",
});
```

然后使用 accessToken 请求租户管理接口。以下以租户、租户成员的简单管理为例：

## 创建租户

```javascript
fetch("https://api.authing.cn/api/v3/create-tenant", {
  data: {
    name: "租户名",
    logo: "租户 logo",
    appIds: ["xxxxxxxxxxxxxxxxxxxxxx"],
  },
  method: "POST",
  headers: {
    "x-authing-userpool-id": "用户池 ID",
    Authorization: "accessToken",
  },
});
```

## 修改租户信息

```javascript
fetch("https://api.authing.cn/api/v3/update-tenant", {
  data: {
    tenantId: "租户 ID",
    updates: {
      name: "租户名",
      logo: "租户 logo",
    },
  },
  method: "POST",
  headers: {
    "x-authing-userpool-id": "用户池 ID",
    Authorization: "accessToken",
  },
});
```

## 创建租户成员

```javascript
fetch("https://api.authing.cn/api/v3/create-tenant-user", {
  data: {
    username: "用户名",
    password: "密码",
  },
  method: "POST",
  headers: {
    "x-authing-userpool-id": "用户池 ID",
    Authorization: "accessToken",
  },
});
```

## 修改租户成员信息

```javascript
fetch('https://api.authing.cn/api/v3/update-tenant-user', {
    data: {
        "memberId": "租户成员 ID"
        "updates": {
            "username": "用户名",
            "password": "密码"
        }
    },
    method: "POST",
    headers: {
        "x-authing-userpool-id": "用户池 ID",
        "Authorization": "accessToken"
    }
});
```

更多 API 可以查看 <https://api.authing.cn/openapi/v3/tenant-management/>
