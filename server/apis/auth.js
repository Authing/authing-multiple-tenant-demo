const axios = require("axios");
var Router = require("express").Router;
var AuthenticationClient = require("authing-js-sdk").AuthenticationClient;
var authenticationClient = new AuthenticationClient({
  appId: process.env.DEMO_AUTHING_APP_ID,
  secret: process.env.DEMO_AUTHING_APP_SECRET,
  appHost: process.env.DEMO_AUTHING_API_ENDPOINT,
  protocol: "oidc",
});

var authRouter = Router();

authRouter.get("/", async function (req, res) {
  res.redirect(
    `${process.env.DEMO_AUTHING_API_ENDPOINT}/oidc/auth?client_id=${
      process.env.DEMO_AUTHING_APP_ID
    }&protocol=oidc&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.DEMO_LOGIN_CALLBACK_HOST + "/auth/callback"
    )}`
  );
});

authRouter.get("/callback", async function (req, res) {
  res.statusCode = 200;
  res.redirect(
    process.env.DEMO_FRONTEND_CALLBACK_URL + `?code=${req.query.code}`
  );
});

authRouter.post("/token", async function (req, res) {
  try {
    var result = await authenticationClient.getAccessTokenByCode(req.body.code);
    res.statusCode = 200;
    res.json({
      code: 200,
      statusCode: 200,
      message: "获取成功",
      data: result,
    });
  } catch (err) {
    console.log("看看出错：", err);
    res.statusCode = 200;
    res.json({
      code: 400,
      statusCode: 400,
      message: "token 请求失败，请查看 demo 后台的调试信息。",
    });
  }
});

authRouter.get("/logout", async function (req, res) {
  let result;
  try {
    result = await axios.request({
      method: "GET",
      url: `${process.env.DEMO_AUTHING_APP_ENDPOINT}/api/v2/logout?app_id=${process.env.DEMO_AUTHING_APP_ID}`,
      headers: {
        authorization: req.headers["authorization"],
        // "x-authing-request-from": "console",
        "x-authing-userpool-id": process.env.DEMO_AUTHING_USERPOOL_ID || "",
        "content-type": "application/json",
      },
      data: {},
    });
  } catch (e) {
    res.json({
      code: 400,
      statusCode: 400,
      message: "登出失败",
    });
  }
  res.json(result);
});

module.exports = authRouter;
