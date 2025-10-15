const express = require("express");
const {userAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database")
const User = require("./models/user")
const validateSignupData = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const app = express();

app.use(cookieParser());

app.use(express.json());

app.use((err, req, res, next) => {
     res.status(400).send({ error: "Invalid JSON format" });
  });


app.post("/signup",async (req,res)=>{
    
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
app.post("/login", async (req,res)=>{

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

//get profile
app.get("/profile",userAuth, async (req,res)=>{
   try{
    const user = req.user
   res.send(user);
   }catch(err){
    res.status(400).send("ERROR : "+err)
   }
})

//send connection request

app.post("/sendConnectionRequest", userAuth, (req,res)=>{
    
    try{
        const user = req.user;
        res.send(user.firstName + " sent  a connection request");
    }catch(err){
        res.status(400).send("ERROR "+err.message)
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