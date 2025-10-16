const express = require("express");
const {connectDB} = require("./config/database")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")


const app = express();

app.use(cookieParser());

app.use(express.json());

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

app.use((err, req, res, next) => {
     res.status(400).send({ error: "Invalid JSON format" });
  });












connectDB().then(()=>{
console.log("conn is established ")
app.listen(7777,()=>{
    console.log("server is running successfully");
    
})
}).catch((err)=>{
    console.error("conn not established")
})