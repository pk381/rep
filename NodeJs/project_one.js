const express = require('express');
const app = express();

app.use((req, res, next)=>{

    res.send({one: "one"});
});

console.log("running");

app.listen(4000);