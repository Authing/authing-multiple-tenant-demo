var Router = require("express").Router;

var adminsRouter = Router();

adminsRouter.post("/create", async function (req, res) {
  res.statusCode = 200;
  res.json({
    success: true,
  });
});

module.exports = adminsRouter;
