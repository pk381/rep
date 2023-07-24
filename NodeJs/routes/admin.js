const express = require('express');
const router = express.Router(); 

router.get("/admin/add-product", (req, res, next) => {
    console.log("product-form");
    res.send(
      '<form action="/admin/product" method ="POST"> Title: <input type="text" name="title"> Size: <input type="text" name="size"> <button type="submit">send</button></form>'
    );
  });
  
router.post("/admin/product", (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
  });

module.exports = router;