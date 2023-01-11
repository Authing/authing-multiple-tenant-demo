var Router = require("express").Router;
var authingRequest = require("../authing").authingRequest;
var applicationsRouter = Router();

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

module.exports = applicationsRouter;
