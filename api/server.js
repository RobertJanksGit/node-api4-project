const express = require("express");
const cores = require("cors");
const userRouter = require("./users/user-router");

const server = express();

server.use(express.json());
server.use(cores());

server.use("/api", userRouter);

// server.use("*", (req, res) => {
//   res.send(`<h1>Hello!</h1>`);
// });

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
