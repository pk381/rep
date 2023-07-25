const express = require("express");

const path = require('path');

const adminRouter = require('./routes/add_product')
const contactRouter = require('./routes/contact')

const shopRouter = require('./routes/shop');

const bodyParser = require("body-parser");

const app = express();

console.log("running");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRouter);
app.use(contactRouter);

app.use((req, res, next)=>{
    res.sendFile(path.join(__dirname, './', 'views', '404.html'));
})


app.listen(4000);
