const express = require('express');
const router = express.Router();

const productsController = require('../controller/product');

router.get('/add-product', productsController.getProductfun);
  
router.post('/products', productsController.postProductfun);

router.get('/products', productsController.productsfun);

module.exports = router;