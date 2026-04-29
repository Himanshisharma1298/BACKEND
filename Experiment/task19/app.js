const express = require('express');
const xss = require('xss-clean');
const app = express();
app.use(express.json());
app.use(xss());
app.post('/student',(req,res)=>{
   res.send({
      message:"Input sanitized successfully",
      data:req.body
   });
});
app.listen(3000,()=>{
 console.log("Server running on port 3000");
});