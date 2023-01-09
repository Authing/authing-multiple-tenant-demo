var Router = require("express").Router;

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
  console.log(req.query);
  res.statusCode = 200;
  res.redirect(
    process.env.DEMO_FRONTEND_CALLBACK_URL + `?code=${req.query.code}`
  );
});

module.exports = loginsRouter;
