const http = require('http');
const fs = require('fs');

const route = require('./routes');

console.log("running");

const server = http.createServer(route);

server.listen(4000);