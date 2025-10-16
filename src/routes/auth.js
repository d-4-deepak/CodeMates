const User = require("../models/user")
const validateSignupData = require("../utils/validation")
const bcrypt = require("bcrypt");


const express = require("express");

const authRouter = express.Router();

//sign up

authRouter.post("/signup",async (req,res)=>{
    
    try{
     //data validation
     validateSignupData(req);
 
     const {firstName,lastName,password,emailId} = req.body
     
   //password encryption 
     const passwordHashed = await bcrypt.hash(password,10);
     console.log(passwordHashed);
     
   
 
     const user = new User({firstName,lastName,emailId, password:passwordHashed});
     await user.save();
     res.send("user added succesfully!")
    }catch(err){
     res.status(400).send("ERROR : "+ err.message)
    }
 })

 //login api
authRouter.post("/login", async (req,res)=>{

    const {emailId,password} = req.body;
    

   try{
    const user = await User.findOne({"emailId":emailId});
    
    if(!user){
        throw new Error("Invalid credentials")
    }

    isValidPassword = await user.comparePassword(password);

    if(isValidPassword){
        //create JWT token
      const token = user.generateJWT()
      
        res.cookie("token",token,{expires: new Date(Date.now()+ 24*3600000)});
        res.send("user login successfully")
    }else{
        throw new Error("Invalid credentials")
    }
   }catch(err){
    res.status(400).send("ERROR : "+ err.message)
   }
})

module.exports = authRouter;