const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{

fs.readFile(__dirname + '/index.html',(err,data)=>{

if(err){
console.log(err);
res.end("Error loading file");
return;
}

res.writeHead(200, {'Content-Type':'text/html'});
res.end(data);

});

});

server.listen(5000);