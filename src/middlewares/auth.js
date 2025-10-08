const adminAuth = (req,res,next)=>{
    let token = "xyz";
    let isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized){
        res.status(401).send("unauthorized access");
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    let token = "xyz";
    let isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized){
        res.status(401).send("unauthorized access");
    }else{
        next();
    }
}

module.exports = {adminAuth,userAuth};