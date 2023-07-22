const http = require('http');

// console.log("running");

const server = http.createServer((req, res)=>{

    console.log("requests");

    if(req.url === '/home'){
        // console.log("home");
        res.write('<html><head><title>Document</title></head>');
        res.write('<body><h1>Welcome Home</h1></body></html>');
        res.end();
    }
    else if(req.url === '/about'){

        // console.log("about");
        res.write('<html><head><title>Document</title></head>');
        res.write('<body><h1>Welcome to About Us Page</h1></body></html>');
        res.end();

    }
    else if(req.url === '/node'){

        // console.log("node");
        res.write('<html><head><title>Document</title></head>');
        res.write('<body><h1>Welcome to Node Js Project</h1></body></html>');
        res.end();

    }
    
});

server.listen(4000);