const mongoose = require("mongoose");

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
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
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
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s"
        
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