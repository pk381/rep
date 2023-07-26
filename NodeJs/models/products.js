const fs = require('fs');

module.exports = class Product{

    // constructor(){

    // }

    save(product){
        fs.appendFileSync("product.txt", product);
    }

    fetchAll(){

        return fs.readFileSync("product.txt").toString();
    }
}