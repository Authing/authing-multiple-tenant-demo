var Router = require("express").Router;

var tenantsRouter = Router();

tenantsRouter.post("/create", async function (req, res) {
  res.statusCode = 200;
  res.json({
    success: true,
  });
});

module.exports = tenantsRouter;
