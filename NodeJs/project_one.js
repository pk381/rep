const http = require('http');
const fs = require('fs');
const { buffer } = require('stream/consumers');

console.log("running");

const server = http.createServer((req, res)=>{

    const url = req.url;
    const method = req.method;

    if(url === '/'){

        fs.readFile('message.txt', 'UTF-8',(err, data)=>{
            console.log("data = ", data);

            console.log("gi");

            res.write('<html><head><title>Document</title></head>');
            res.write(`<body><h1>${data}</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body></html>`);
            return res.end();
        });

    }
    
    if(url === '/message' && method === 'POST'){

        console.log("in message");

        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });

        req.on('end', ()=>{
            const messsage = Buffer.concat(body).toString().split("=")[1];
            // console.log(messsage);
            fs.writeFileSync("message.txt", messsage);

        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();

    }
    
    
});

server.listen(4000);