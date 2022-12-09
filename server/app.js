const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const authMiddleware = require("./middlewares/auth.middleware");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const { sequelize } = require("./config/getConnection");

const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./config");

const app = express();

app.use(cors()); // 允许跨域

// 测试数据库连接
sequelize
  .authenticate()
  .then(() => {
    console.log(">>>>>>>>>>数据库连接成功<<<<<<<<<<");
  })
  .catch(() => console.log(">>>>>>>数据库连接失败，请重试<<<<<<<<<"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/*", authMiddleware);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(
  "/authing-tenant",
  createProxyMiddleware({
    target: config.authing.host,
    pathRewrite(path, req) {
      console.log(path);
      return path;
    },
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
