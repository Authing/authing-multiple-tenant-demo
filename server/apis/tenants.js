var Router = require("express").Router;
var authingRequest = require("../authing");
var tenantsRouter = Router();

tenantsRouter.post("/create", async function (req, res) {
  var result = await authingRequest(
    "POST",
    "/api/v3/create-tenant",
    req.body,
    req.headers["authorization"]
  );
  res.statusCode = 200;
  res.json(result);
});

tenantsRouter.post("/update-config", async function (req, res) {
  var result = await authingRequest(
    "POST",
    "/api/v3/update-userpool-tenant-config",
    req.body,
    req.headers["authorization"]
  );
  res.statusCode = 200;
  res.json(result);
});

module.exports = tenantsRouter;
