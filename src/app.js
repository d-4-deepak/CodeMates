const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth");
require("./config/database")
const app = express();


app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})

app.use("/admin",(req,res)=>{
    // try{
    //     throw new Error("dueduh")
    //     res.send("user Data Sent")
    // }catch{
    //     res.status(500).send("hanldled error using try and catch");
    // }
       throw new Error("dueduh")
      res.send("user Data Sent")
 
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})


app.listen(7777,()=>{
    console.log("server is running successfully");
    
});