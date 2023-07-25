const path = require('path'); 

exports.errorPageFun = (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', '404.html'));
}