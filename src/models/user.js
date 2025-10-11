const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    lastName:{
        type: String,
        maxLength: 50,
        trim: true
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value)=>{
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email Address "+ value)
                }
            }
        
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        validate: (value)=>{
            if(!validator.isStrongPassword(value)){
                throw new Error("please enter a strong password "+ value)
            }
        }
    },
    age:{
        type: Number,
        min: 18,
        max:120,
    },
    gender:{
        type: String,
        validate: (value)=>{
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type: String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s",
        validate: (value)=>{
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL "+ value)
            }
        }
        
    },
    about:{
        type: String,
        default: "this is the default about"
    },
    skills:{
        type: [String]
    }
},{ timestamps: true })

const User = mongoose.model("User",userSchema);
module.exports = User