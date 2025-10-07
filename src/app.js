const express = require("express");

const app = express();
app.get("/ab*cd",(req,res)=>{
    res.send("abcd")
})
app.get("/user",(req,res)=>{
    res.send("get user")
})

app.get("/user/xyz",(req,res)=>{
    res.send("get user/xyz")
})
app.post("/user",(req,res)=>{
    res.send("post user")
})
app.patch("/user",(req,res)=>{
    res.send("patch user")
})
app.put("/user",(req,res)=>{
    res.send("put user")
})
app.delete("/user",(req,res)=>{
    res.send("delete user")
})
app.listen(7777,()=>{
    console.log("server is running successfully");
    
});