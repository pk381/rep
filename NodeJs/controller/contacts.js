const path = require('path'); 
const rootDir = require('../helper/path');

exports.getContactUsfun = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
  }

exports.successfun = (req, res, next) => {
    res.send('<h1> Form Successfully Filled </h1>');
  }