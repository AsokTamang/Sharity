import mongoose from "mongoose";


const buyerSchema=new mongoose.Schema({
   id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User' ,   //this buyer id is also an id of one of the userID
    unique:true,
   },
   
     
    
},{
    collection:'buyers'
});
export const buyerModal=mongoose.models.Buyer||mongoose.model('Buyer',buyerSchema)