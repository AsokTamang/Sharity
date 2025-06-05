import mongoose from "mongoose";
import { userModal } from "./usermodel";


const itemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "please provide a valid id"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "please provide a name of an item"],
  
    },
    description: {
      type: String,
     
    },
    image: {
      type: String,
      required: [true, "please provide a valid image url"],
      validation:{
        validator:(v:any)=>/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(v)
      }

    },
    user:{
      type:mongoose.Schema.Types.ObjectId,     //here we are having this user field whose type is the mongodb Id , and it is the reference to the another model called User 
      ref:'User',
      required:true,
      index:true,


    },

    condition: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const itemModal =
  mongoose.models.Item || mongoose.model("Item", itemSchema); //here we are creating the collelction named Item with the schema itemSchema. and we must use mongoose.models.modelname so that the mongo db wont try to overrider the existing model due to nextjs route handling feature.
