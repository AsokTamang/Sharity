import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        min:3,
       required:[true,'please provide a valid username'],
       unique:true,
    },
     email:{
        type:String,
       required:[true,'please provide a valid email'],
       unique:true,
    },
  password:{
        type:String,
        min:8,
        required:[true,'please provide a valid password'],
       unique:true,
    },
   contact:{
    type:Number,
    required:true,
   },




},{
    timestamps:true,
    collection:'users',
})
export const userModal=mongoose.models.User||mongoose.model('User',userSchema);  //here we are creating the database named next with the schema userSchema. and we must use mongoose.models.modelname so that the mongo db wont try to overrider the existing model due to nextjs route handling feature.