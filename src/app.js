const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("hii java ")
})
app.use("/user",(req,res)=>{
    res.send("hii user ")
})
app.use("/man",(req,res)=>{
    res.send("hii man ")
})
app.use("/",(req,res)=>{
    res.send("hii from dashboard")
})
app.listen(7777,()=>{
    console.log("server is running successfully");
    
});