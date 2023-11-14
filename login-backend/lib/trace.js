const bunyan = require("bunyan");

const log = bunyan.createLogger({
  name: "TodoList",
  stream: process.stdout,
});

module.exports = log;