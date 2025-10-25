const {userAuth} = require("../middlewares/auth");
const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


//send connection request
requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
    
    try{
        const user = req.user;
        const fromUserId = req.user._id;
        const status = req.params.status;
        const toUserId = req.params.toUserId;


               
        const ALLOWED_STATUS = ["interested","ignored"];
        const isAllowed = ALLOWED_STATUS.includes(status);

             //if user doesnot exist in DB validation 

             const toUser = await User.findById(toUserId);
             if(!toUser){
                return res.status(400).json({message:"user not found"})
             }

                //status validation
        if(!isAllowed){
            return  res.status(400).json({ message: "Invalid status type: " + status });
        }
            // if already exists validation
        const isExistingRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId: fromUserId, toUserId: toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ],
        })
        if(isExistingRequest){
            return res.status(400).json({message: "Connection Request Already Exists"})
        }

        // if user try to send request to themself validation 

        if(fromUserId.toString() === toUserId.toString()){
            return res.status(400).json({ message: "You cannot send a request to yourself" });
        }

   
        

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectionRequest.save();

        res.json({
            message:status ==="interested"? req.user.firstName+ " is "+ status + " in "+ toUser.firstName : req.user.firstName+ " " + status + " "+ toUser.firstName,
            data
        });
    }catch(err){
        res.status(400).send("ERROR "+err.message)
    }
})

module.exports = requestRouter