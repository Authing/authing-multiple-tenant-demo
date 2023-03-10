var Router = require("express").Router;
var authingRequest = require("../authing").authingRequest;
var applicationsRouter = Router();

applicationsRouter.get("/default", async function (req, res) {
  var result = await authingRequest(
    "GET",
    `/api/v2/applications/default`,
    {},
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.get("/config/:appId", async function (req, res) {
  var appId = req.params.appId;
  var result = await authingRequest(
    "GET",
    `/api/v2/applications/${appId}/public-config`,
    {},
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.post("/page-config", async function (req, res) {
  var result = await authingRequest(
    "POST",
    `/api/v2/component-page-config-management/guard/default-app`,
    req.body,
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.get("/page-config", async function (req, res) {
  var result = await authingRequest(
    "GET",
    `/api/v2/component-page-config-management/guard/default-app`,
    {},
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.post("/update/:appId", async function (req, res) {
  var appId = req.params.appId;
  var result = await authingRequest(
    "POST",
    `/api/v2/applications/${appId}`,
    req.body,
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.get(
  "/has-custom-branding-enabled-app",
  async function (req, res) {
    var result = await authingRequest(
      "GET",
      `/api/v2/applications/has-custom-branding-enabled-app`,
      {},
      req.headers["authorization"],
      req.query.tenantId
    );
    res.statusCode = 200;
    res.json(result);
  }
);

applicationsRouter.get("/v3-read/:appId", async function (req, res) {
  var result = await authingRequest(
    "GET",
    `/api/v3/get-application?appId=${req.params.appId}`,
    {},
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.post(
  "/v3-update-login-page-config",
  async function (req, res) {
    var result = await authingRequest(
      "POST",
      `/api/v3/update-login-page-config`,
      req.body,
      req.headers["authorization"],
      req.query.tenantId
    );
    res.statusCode = 200;
    res.json(result);
  }
);

module.exports = applicationsRouter;
