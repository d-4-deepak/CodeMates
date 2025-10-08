const express = require("express");

const app = express();

app.use("/user",(req,res,next)=>{
    //  res.send("1st route handler")
    next();
},
(req,res,next)=>{
    next()
    // res.send("2nd route handler")
},
(req,res)=>{
    console.log("djdj");
    
    res.send("3rd route handler")
},
)
app.listen(7777,()=>{
    console.log("server is running successfully");
    
});