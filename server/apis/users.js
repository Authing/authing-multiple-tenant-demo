var Router = require("express").Router;
var authingRequest = require("../authing");

var usersRouter = Router();

usersRouter.post("/create", async function (req, res) {
  // use v3 api to create a user
  await authingRequest("POST", "/api/v3/create-user", {});

  res.statusCode = 200;
  res.json({
    success: true,
  });
});

usersRouter.post("/update/:id", async function (req, res) {
  // use v3 api to update a user

  res.statusCode = 200;
  res.json({
    success: true,
  });
});

usersRouter.post("/delete/:id", async function (req, res) {
  // use v3 api to delete a user

  res.statusCode = 200;
  res.json({
    success: true,
  });
});

usersRouter.get("/get/:id", async function (req, res) {
  // use our api to read user

  res.statusCode = 200;
  res.json({
    success: true,
  });
});

usersRouter.get("/list", async function (req, res) {
  // use our api to read users

  res.statusCode = 200;
  res.json({
    success: true,
  });
});

module.exports = usersRouter;
