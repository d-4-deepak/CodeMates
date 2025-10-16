const {userAuth} = require("../middlewares/auth");

const express = require("express");

const requestRouter = express.Router();



//send connection request

requestRouter.post("/sendConnectionRequest", userAuth, (req,res)=>{
    
    try{
        const user = req.user;
        res.send(user.firstName + " sent  a connection request");
    }catch(err){
        res.status(400).send("ERROR "+err.message)
    }
})


module.exports = requestRouter