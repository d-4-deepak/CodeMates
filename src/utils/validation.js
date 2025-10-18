const validator = require("validator")

const validateSignupData = (req)=>{
    const {firstName,lastName, emailId, password} = req.body;

    if(!firstName){
        throw new Error("please enter the your name ")
    }else if(firstName.length<3 || firstName.length>30){
        throw new Error("Name length should be in range 3-50 characters")
    }else if(lastName &&  lastName.length>30){
        throw new Error("Name length should be in range 3-50 characters")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please enter a valid email Id")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special char, and be at least 8 characters long")
    }
}

const validateEditProfile = (req)=>{
    const allowedEditFields = ["firstName", "lastName","emailId","age","gender","photoUrl","about","skills"];

  const isAllowed =   Object.keys(req.body).every((key)=>allowedEditFields.includes(key));
  return isAllowed;
}
module.exports = {validateSignupData, validateEditProfile}