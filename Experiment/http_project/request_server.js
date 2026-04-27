const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{

   const parsedUrl = url.parse(req.url, true);

   console.log("Request Method:", req.method);
   console.log("Request URL:", req.url);
   console.log("Headers:", req.headers);
   console.log("Query Strings:", parsedUrl.query);

   if(req.method === "GET"){
      res.write("This is GET Request Response");
   }
   else if(req.method === "POST"){
      res.write("This is POST Request Response");
   }
   else{
      res.write("Other Request Received");
   }

   res.end();
});

server.listen(8080, ()=>{
   console.log("Server running on port 8080");
});