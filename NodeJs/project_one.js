const express = require("express");
const app = express();

const bodyParser = require("body-parser");

console.log("running");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  console.log("product-form");
  res.send(
    '<form action="product" method ="POST"> Title: <input type="text" name="title"> Size: <input type="text" name="size"> <button type="submit">send</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express JS</h1>");
});

app.listen(4000);
