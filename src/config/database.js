const { default: mongoose } = require("mongoose");

const connString = "mongodb+srv://namastedev:Ia2bgFpDBjisnTmr@namastenode.3fido.mongodb.net/devTinder";

const connectDB = async ()=>{
    await mongoose.connect(connString);
}
module.exports = {connectDB}

// connectDB().then(()=>{
//     console.log("connection established successfully", connectDB);
// }).catch((err)=>{
//     console.error("connection did not established");

// })
