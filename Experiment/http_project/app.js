const express = require('express');
const app = express();

app.use(express.json());

app.use((req,res,next)=>{
   console.log(req.method, req.url);
   next();
});

function validateStudent(req,res,next){

   if(!req.query.name){
      return res.send("Name is required");
   }

   next();
}

function auth(req,res,next){

   if(req.query.token !== "12345"){
      return res.send("Unauthorized Access");
   }

   next();
}

app.get('/student', auth, validateStudent, (req,res)=>{
   res.send("Welcome to Yamuna Hostel" + req.query.name);
});

app.listen(3000, ()=>{
   console.log("Server running on port 3000");
});