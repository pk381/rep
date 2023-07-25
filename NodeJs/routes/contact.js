const express = require('express');
const router = express.Router();
const path = require('path'); 

const rootDir = require('../helper/path');

const contacts = require('../controller/contacts');

router.get('/contactus', contacts.getContactUsfun);

// router.get('/contactus', (req, res, next) => {

//     res.sendFile(path.join(rootDir, 'views', 'contactus.html'));

//   });
  
// router.post('/success', (req, res, next) => {
//     res.send('<h1> Form Successfully Filled </h1>');
//   });

router.post('/success', contacts.successfun);

module.exports = router;