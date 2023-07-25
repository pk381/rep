const express = require("express");

const path = require('path');

const adminRouter = require('./routes/add_product')
const contactRouter = require('./routes/contact')

// 404 page 

const errorPage = require('./controller/404');

const bodyParser = require("body-parser");

const app = express();

console.log("running");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRouter);
app.use(contactRouter);

app.use(errorPage.errorPageFun);


app.listen(4000);
