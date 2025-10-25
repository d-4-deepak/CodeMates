const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type: "String",
        enum: {
           values : ["ignored","accepted","rejected","interested"],
           message : `{VALUE} is not a valid status type`
        }
    }

},{
    timestamps: true,
}
)

connectionRequestSchema.index({fromUserId:1, toUserId:1},{unique:true});

const ConnectionRequestModel =  mongoose.model("ConnectRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;