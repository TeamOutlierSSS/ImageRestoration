const express = require('express');
const app = express();
const test = require("./Router/test")
const returnjs = require("./Router/return")

const PORT = 3001;

app.use("/api/test", test);
app.use("/api/return", returnjs)

app.listen(PORT, function () {
  console.log('listening on '+ PORT);
});