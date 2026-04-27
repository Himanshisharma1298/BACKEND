const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

app.post('/login',(req,res)=>{

const {username, role} = req.body;

const token = jwt.sign(
   {
      username: username,
      role: role
   },
   SECRET_KEY
);

res.json({token});

});

function verifyToken(req,res,next){

const authHeader = req.headers.authorization;

if(!authHeader){
 return res.send("Token Required");
}

const token = authHeader.split(' ')[1];

jwt.verify(token, SECRET_KEY, (err,decoded)=>{

 if(err){
   return res.send("Invalid Token");
 }

 req.user = decoded;
 next();

});

}

function isAdmin(req,res,next){

 if(req.user.role==="admin"){
    next();
 }

 else{
   res.send("Access Denied: Admin Only");
 }

}

function isUser(req,res,next){

 if(req.user.role==="user"){
    next();
 }

 else{
   res.send("Access Denied: User Only");
 }

}

app.delete('/deleteStudent',
verifyToken,
isAdmin,
(req,res)=>{
res.send("Student Record Deleted");
});

app.get('/profile',
verifyToken,
isUser,
(req,res)=>{
res.send("User Profile Accessed");
});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});