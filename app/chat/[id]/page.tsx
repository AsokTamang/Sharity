import { userModal } from '@/models/usermodel';
import mongoose from 'mongoose';
import ChatClientpage from './client'
import { itemModal } from '@/models/itemmodel';



interface user {
  _id:string;
  email:string;
  contact:number;
}

export default async function Chat({params}:{params:{id:string}}){

   
    const id=await params.id;  //this is a item's  id 
    const data=await itemModal.findById(new mongoose.Types.ObjectId(id));      //then we are extracting the item detail
  

    const ownerID=data?.user._id   //this is the id of the owner of an item
    
   
  
   

   //we are passing both the owner's id as well as the item's id as the string.
   
    return(
        <>
      <ChatClientpage  ownerID={ownerID.toString()} itemID={id}   />   


        </>
    )
}




