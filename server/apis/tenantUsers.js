var Router = require("express").Router;
var authingRequest = require("../authing").authingRequest;
var tenantUsersRouter = Router();

tenantUsersRouter.post("/invite", async function (req, res) {
  var result = await authingRequest(
    "POST",
    "/api/v3/add-tenant-users",
    req.body,
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

tenantUsersRouter.post("/generate-invite-link", async function (req, res) {
  var result = await authingRequest(
    "POST",
    "/api/v3/generate-invite-tenant-user-link",
    req.body,
    req.headers["authorization"],
    req.query.tenantId
  );
  res.statusCode = 200;
  res.json(result);
});

module.exports = tenantUsersRouter;
