const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

let users = [];

app.post('/signup',(req,res)=>{
   users.push(req.body);
   res.send("User Registered");
});

app.post('/login',(req,res)=>{

 const {username,password} = req.body;

 const user = users.find(
   u=>u.username===username && u.password===password
 );

 if(!user){
   return res.send("Invalid Credentials");
 }

 const token = jwt.sign(
   {username:user.username},
   SECRET_KEY,
   {expiresIn:'1h'}
 );

 res.json({token});

});

function verifyToken(req,res,next){

 const bearerHeader = req.headers['authorization'];

 if(!bearerHeader){
   return res.send("Token Required");
 }

 const token = bearerHeader.split(' ')[1];

 jwt.verify(token,SECRET_KEY,(err,decoded)=>{

   if(err){
      return res.send("Invalid Token");
   }

   req.user=decoded;
   next();

 });

}

app.get('/dashboard', verifyToken,(req,res)=>{
   res.send("Welcome "+req.user.username);
});


app.listen(3000,()=>{
console.log("Server running on port 3000");
});