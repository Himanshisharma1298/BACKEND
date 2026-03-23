const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.appendFile(
    'log.txt',
    `${new Date().toISOString()} | ${req.method} | ${req.url}\n`,
    console.error
  );

  res.end('Logged');
}).listen(3000);


