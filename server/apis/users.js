var Router = require("express").Router;

var usersRouter = Router();

usersRouter.post("/create", async function (req, res) {
  res.statusCode = 200;
  res.json({
    success: true,
  });
});

module.exports = usersRouter;
