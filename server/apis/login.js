var Router = require("express").Router;
var AuthenticationClient = require("authing-js-sdk").AuthenticationClient;
var authenticationClient = new AuthenticationClient({
  appId: process.env.DEMO_AUTHING_CLIENT_ID,
  secret: process.env.DEMO_AUTHING_CLIENT_SECRET,
  appHost: process.env.DEMO_AUTHING_API_ENDPOINT,
  protocol: "oidc",
});

var loginsRouter = Router();

loginsRouter.get("/", async function (req, res) {
  res.redirect(
    `${process.env.DEMO_AUTHING_API_ENDPOINT}/oidc/auth?client_id=${
      process.env.DEMO_AUTHING_CLIENT_ID
    }&protocol=oidc&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.DEMO_LOGIN_CALLBACK_HOST + "/login/callback"
    )}`
  );
});

loginsRouter.get("/callback", async function (req, res) {
  res.statusCode = 200;
  res.redirect(
    process.env.DEMO_FRONTEND_CALLBACK_URL + `?code=${req.query.code}`
  );
});

loginsRouter.post("/token", async function (req, res) {
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

module.exports = loginsRouter;
