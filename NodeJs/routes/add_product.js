const express = require('express');
const router = express.Router();

const productsController = require('../controller/product');

router.get('/', productsController.getProductfun);
  
router.post('/product', productsController.postProductfun);

module.exports = router;