const path = require('path'); 
const rootDir = require('../helper/path');

const Product = require('../models/products');

const product = new Product();

const fs = require('fs');

exports.getProductfun = (req, res, next) => {

    res.sendFile(path.join(rootDir, 'views', 'add_product.html'));

}

exports.postProductfun = (req, res, next) => {

    let data = req.body.product + " ";
    console.log(data);

    product.save(data);
    // fs.appendFileSync("product.txt", data);
    res.redirect('/products');
}

exports.productsfun = (req, res, next) =>{

    // let data = fs.readFileSync("product.txt").toString();
    let data = product.fetchAll();

    console.log(data);

    res.sendFile(path.join(rootDir, 'views', 'products.html'));
}