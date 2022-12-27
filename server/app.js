const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const debug = require("debug")("server:server");
const http = require("http");

const usersRouter = require("./apis/users");
const tenantsRouter = require("./apis/tenants");
const adminsRouter = require("./apis/admins");

const app = express();

app.use(cors()); // 允许跨域

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/tenants", tenantsRouter);
app.use("/admins", adminsRouter);

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
