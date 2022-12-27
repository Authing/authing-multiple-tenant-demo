var Router = require("express").Router;

var usersRouter = Router();

router.post("/create", async function (req, res) {
  try {
    const result = await axios.request({
      method: req.method,
      url: `${host}${req.url}`,
      headers: {
        authorization: req.headers["authorization"] || "",
        "x-authing-request-from": "console",
        "x-authing-userpool-id": req.headers["x-authing-userpool-id"] || "",
        "x-authing-app-tenant-id": req.headers["x-authing-app-tenant-id"] || "",
        "content-type": "application/json",
      },
      data: JSON.stringify(req.body || {}),
    });
    res.statusCode = 200;
    res.json(JSON.parse(result.data));
  } catch (error) {
    console.log(error);
    res.json({
      error: "错误发生了。",
    });
    res.statusCode = 400;
  }
});

module.exports = usersRouter;
