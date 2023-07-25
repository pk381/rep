const path = require('path'); 
const rootDir = require('../helper/path');

exports.getProductfun = (req, res, next) => {
    console.log("Add Product");
    res.sendFile(path.join(rootDir, 'views', 'add_product.html'));

}

exports.postProductfun = (req, res, next) => {
    res.redirect('/');
}