const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(
 session({
   secret:'mysecret',
   resave:false,
   saveUninitialized:false
 })
);


const hashedPassword = bcrypt.hashSync("admin123",10);

const user = {
 username:"riya",
 password: hashedPassword
};


app.get('/',(req,res)=>{
res.send(`
<form method="POST" action="/login">
Username: <input name="username"><br>
Password: <input name="password" type="password"><br>
<button>Login</button>
</form>
`);
});

app.post('/login', async(req,res)=>{

 const {username,password}=req.body;

 if(
   username===user.username &&
   await bcrypt.compare(password,user.password)
 ){
    req.session.user=username;
    res.send("Login Successful");
 }

 else{
   res.send("Invalid Credentials");
 }

});


function auth(req,res,next){

 if(req.session.user){
   next();
 }
 else{
   res.send("Please Login First");
 }

}

app.get('/dashboard', auth,(req,res)=>{
res.send("Welcome to Dashboard "+req.session.user);
});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});