var Router = require("express").Router;
var authingRequest = require("../authing").authingRequest;
var applicationsRouter = Router();

applicationsRouter.get("/default", async function (req, res) {
  var result = await authingRequest(
    "GET",
    `/api/v2/applications/default`,
    {},
    req.headers["authorization"]
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
    req.headers["authorization"]
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.post("/page-config", async function (req, res) {
  var result = await authingRequest(
    "POST",
    `/api/v2/component-page-config-management/guard/default-app`,
    {},
    req.headers["authorization"]
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.get("/page-config", async function (req, res) {
  var result = await authingRequest(
    "GET",
    `/api/v2/component-page-config-management/guard/default-app`,
    {},
    req.headers["authorization"]
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.post("/update/:appId", async function (req, res) {
  var appId = req.params.appId;
  var result = await authingRequest(
    "POST",
    `api/v2/applications/${appId}`,
    {},
    req.headers["authorization"]
  );
  res.statusCode = 200;
  res.json(result);
});

applicationsRouter.get(
  "/has-custom-branding-enabled-app",
  async function (req, res) {
    var result = await authingRequest(
      "GET",
      `api/v2/applications/has-custom-branding-enabled-app`,
      {},
      req.headers["authorization"]
    );
    res.statusCode = 200;
    res.json(result);
  }
);

module.exports = applicationsRouter;
