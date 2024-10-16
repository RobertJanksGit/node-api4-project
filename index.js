require("dotenv").config();
const express = require("express");
const cores = require("cors");

const server = express();

server.use(express.json());
server.use(cores());

const port = process.env.PORT || 9000;

server.get("/api/hello", (req, res) => {
  res.json({ message: "api is working" });
});

server.use("*", (req, res) => {
  res.send(`<h1>Hello!</h1>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
