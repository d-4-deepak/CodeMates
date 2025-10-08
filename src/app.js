const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth");
const app = express();



app.use("/admin",adminAuth)
app.use("/user",userAuth,(req,res)=>{
    res.send("user Data Sent")
})

app.use("/admin/getAllData",(req,res)=>{
    res.send("all data send");
})

app.use("/admin/DeleteUser",(req,res)=>{
    res.send("user deleted");
})

app.listen(7777,()=>{
    console.log("server is running successfully");
    
});