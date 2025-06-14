import mongoose  from "mongoose";

const roomIdschema=new mongoose.Schema({
    roomid:{
        type:String,

    }
},{
    collection:'rooms'
});

export const roomidModal=mongoose.models.Room||mongoose.model('Room',roomIdschema);