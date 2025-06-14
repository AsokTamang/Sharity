
import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        
    },
    roomId:{    //we must save the roomID in our message model so that we can display the older messages which are linked with this message model
        type:String,
    }
    
    
    ,
    timeStamp:{
        type:Date,
        default:Date.now,
    }
},{
    collection:'messages'
})

export const messageModal=mongoose.models.Message||mongoose.model('Message',messageSchema)