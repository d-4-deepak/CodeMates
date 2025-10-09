const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database")
const User = require("./models/user")
const app = express();

app.post("/signup",async (req,res)=>{
    // creating a new instance of user model
    const user = new User({
        firstName: "Sachin",
        lastName: "Tendulkar",
        emailId: "st@gmail.com",
        password: "sachin@123",
    });
   try{
    await user.save();
    res.send("user added succesfully!")
   }catch(err){
    res.status(400).send("Error saving the user: "+ err.message)
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