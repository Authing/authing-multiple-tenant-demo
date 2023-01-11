const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const debug = require("debug")("server:server");
const http = require("http");

const tenantsRouter = require("./apis/tenants");
const tenantUsersRouter = require("./apis/tenantUsers");
const applicationsRouter = require("./apis/applications");
const loginRouter = require("./apis/login");
const uploadRouter = require("./apis/upload");

const app = express();

app.use(cors()); // 允许跨域

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/tenants", tenantsRouter);
app.use("/tenant-users", tenantUsersRouter);
app.use("/applications", applicationsRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: "Internal error happened.",
    code: 500,
    statusCode: 500,
  });
});

/**
 * Get port from environment and store in Express.
 */

var port = Number(process.env.DEMO_SERVER_PORT) || 3010;
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

server.listen(port, () => {
  console.log(`HTTP 服务已启动，监听端口: ${port}，进程 ID：${process.pid}`);
});
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
