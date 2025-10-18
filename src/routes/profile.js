const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {validateEditProfile, validateSignupData} = require("../utils/validation");
const bcrypt = require("bcrypt")
const validator = require("validator")

const profileRouter = express.Router();

//get profile
profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try{
     const user = req.user
    res.send(user);
    }catch(err){
     res.status(400).send("ERROR : "+err)
    }
 })

 profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
   try{

    if(!validateEditProfile(req)){
        throw new Error("Invalid edit request")
    }
    const user = req.user;
    console.log(user);

    Object.keys(req.body).forEach((key)=>user[key] = req.body[key])
    console.log(user);

    await user.save();
    res.json({message: `${user.firstName}, your profile updated succesfully`, data: user});
   }catch(err){
    res.status(400).send("ERROR "+ err.message)
   }
 })

 profileRouter.patch("/profile/password", userAuth, async (req,res)=>{
  req.body.newPassword =  req.body.newPassword.trim();
    const {currentPassword, newPassword} = req.body;

    console.log(req.body);
    
    const user = req.user;
    try{
      if(!validator.isStrongPassword(newPassword)){
        throw new Error("Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special char, and be at least 8 characters long")
      }
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if(!isCurrentPasswordValid){
      throw new Error("invalid Current Password");
    }else{
      const passwordHash = await bcrypt.hash(newPassword,10);
      user.password = passwordHash;
      await user.save();
      res.send("password Updated Successfully")
    }
    
    }catch(err){
      res.status(400).json({ error: err.message });;
    }
 })

 module.exports = profileRouter