const http = require('http');

const server = http.createServer((req,res)=>{

   switch(req.url){

      case '/home':
         res.write("Welcome to Home Page");
         break;

      case '/login':
         res.write("Login Page");
         break;

      case '/data':
         res.write("Data Page");
         break;

      default:
         res.write("404 Page Not Found");
   }

   res.end();

});

server.listen(8080, ()=>{
   console.log("Server running on port 8080");
});