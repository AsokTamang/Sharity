
import { itemModal } from "@/models/itemmodel";
import { userModal } from "@/models/usermodel";
import { itemStore } from "@/store/itemstore";
import { connection } from "@/connectionconfig/connectionconfig";
import Client from "./client";
import mongoose from "mongoose";

export default async function Detail({ params }: { params: {id:mongoose.ObjectId}} ) {

  const  id  = params.id;  //here we are destructuring the id from the params 
  await connection();


  const data = await itemModal.findById(id).populate('user','email contact');  //then we try to fetch the item data using mongoose model and also populating the user data of that specific item
 
  const item=data.toObject();   //here we are passing the mongoose document into object so it wont cause bug while passing this data as a prop in our client side page which is a part of this current page cause mongoose documnet cannot be passed as a prop directly which can cause bundle size error
  
  item._id=item._id.toString();    //then we are also convering the item's id intro string
  item.user._id=item?.user?._id.toString();  //same here for user
  
  return (
    <div className="flex justify-center items-center">
    <Client data={item}/>
    </div>
   
  );
}
