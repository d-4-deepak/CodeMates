const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database")
const User = require("./models/user")
const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    const user = new User(req.body);
   try{
    await user.save();
    res.send("user added succesfully!")
   }catch(err){
    res.status(400).send("Error saving the user: "+ err.message)
   }
})

app.get("/user",async (req,res)=>{
    try{
    const user =await User.findOne({emailId: req.body.emailId})
    if(!user){
        res.status(404).send("user not found")
    }else{
        res.send(user);
    }

    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.get("/feed",async (req,res)=>{
    try{
      const users = await  User.find({});
      if(users.length ===0){
        res.status(404).send("user not found")
      }else{
        res.send(users)
      }
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

connectDB().then(()=>{
console.log("conn is established ")
app.listen(7777,()=>{
    console.log("server is running successfully");
    
})
}).catch((err)=>{
    console.error("conn not established")
})