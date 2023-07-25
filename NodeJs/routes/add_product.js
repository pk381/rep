const express = require('express');
const router = express.Router();
const path = require('path'); 

const rootDir = require('../helper/path');

router.get('/', (req, res, next) => {
    console.log("Add Product");

    res.sendFile(path.join(rootDir, 'views', 'add_product.html'));

  });
  
router.post('/product', (req, res, next) => {
    console.log(req.body.title);
    res.redirect('/');
  });

module.exports = router;