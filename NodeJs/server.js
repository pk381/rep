const http = require('http');
const fs = require('fs');

console.log("running");

const server = http.createServer((req, res)=>{

    console.log("requests");
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html><head><title>Document</title></head>');
        res.write('<body><h1></h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body></html>');
        return res.end();
    }
    else if(url === '/message' && method === 'POST'){

        fs.writeFileSync("message.txt", "dummty");
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();

    }
    
    
});

server.listen(4000);