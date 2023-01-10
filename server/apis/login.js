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
    res.json(result);
  } catch (err) {
    console.log("看看出错：", err);
    res.statusCode = 200;
    res.json({ error: "token 请求失败", code: 400, statusCode: 400 });
  }
});

module.exports = loginsRouter;
