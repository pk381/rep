const express = require("express");

const adminRouter = require('./routes/admin')

const shopRouter = require('./routes/shop');

const bodyParser = require("body-parser");

const app = express();

console.log("running");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRouter);
app.use(shopRouter);

app.use((req, res, next)=>{
    res.status(404).send('<h1>Page Not Found</h1>');
})


app.listen(4000);
