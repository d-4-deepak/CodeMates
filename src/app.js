const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database")
const User = require("./models/user")
const validateSignupData = require("./utils/validation")
const bcrypt = require("bcrypt")
const app = express();

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
    console.log(req.body);
    

   try{
    const user = await User.findOne({"emailId":emailId});
    // console.log(user);
    if(!user){
        throw new Error("Invalid credentials")
    }

    isValidPassword = await bcrypt.compare(password,user?.password);

    if(isValidPassword){
        res.send("user login successfully")
    }else{
        throw new Error("Invalid credentials")
    }
   }catch(err){
    res.status(400).send("ERROR : "+ err.message)
   }
})

//get user my emailId
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
// get feed
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

// get user by id
// app.get("/id", async (req,res)=>{
//     try{
//         const users = await  User.findById({_id : req.body._id});
//         if(users.length ===0){
//           res.status(404).send("user not found")
//         }else{
//           res.send(users)
//         }
//       }catch(err){
//           res.status(400).send("something went wrong")
//       }
// })

//delete user by id

app.delete("/user",async (req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.body._id);
        if(!deletedUser){
            res.status(404).send("user not found!")
        }else{
            res.send("user deleted successfully")
        }
       
    }catch(err){
        res.status(400).send("something went wrong");
    }
})

//patch update
app.patch("/user/:userId", async (req,res)=>{


    
    const userId = req.params?.userId;
    const dataToUpdate = req.body;
   
    
    
    try{
        const ALLOWED_UPDATES = [
       
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills"
        ]
        if(dataToUpdate?.skills?.length>30){
            throw new Error("skills cannot be more than 30")
        }
    
        if (!userId) {
            return res.status(400).send("userId is required");
        }
       
    
       const isUpdateAllowed =  Object.keys(dataToUpdate).every((key)=>{
          return  ALLOWED_UPDATES.includes(key)
        })
        
        if(!isUpdateAllowed){
           return res.status(400).send("updation not allowed");
        }

        const updateUser = await User.findByIdAndUpdate(userId,dataToUpdate,{returnDocument:"after",runValidators: true});
        if(!updateUser){

            res.status(404).send("user not found!")
        }else{
            res.send("user updated successfully")
        }
    }catch(err){
        res.status(400).send("data updation failed "+ err)
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