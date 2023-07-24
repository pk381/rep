const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/', (req, res, next)=>{

    console.log(req.body.message);

    const data = fs.readFileSync("message.txt").toString();
    console.log(data);
    res.send(
        `<h1>Message Page</h1> <br> <p> ${data}</p>  <br> <form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/" method ="POST"> Message: <input type="text" id="message" name="message"> <input type="hidden" id="username" name="username"> <button type="submit">send</button></form>`);

})

router.get('/login', (req, res, next) => {
    res.send(
      `<h1>Login Page</h1> <br> <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method ="POST"> UserName: <input type="text" id="username" name="username"><button type="submit">login</button></form>`
    );
  });
  
router.post('/', (req, res, next) => {

    let username = req.body.username;
    let message = req.body.message;

    console.log("usename" + username);
    console.log("message" + message);


    if(message != undefined)
        fs.appendFileSync("message.txt", username + " " + message + " ");
    res.redirect('/');
  });

module.exports = router;