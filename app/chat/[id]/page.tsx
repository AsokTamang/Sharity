import { userModal } from '@/models/usermodel';
import mongoose from 'mongoose';
import ChatClientpage from './client'
import { itemModal } from '@/models/itemmodel';



interface user {
  _id:string;
  email:string;
  contact:number;
}

export default async function Chat({params}:{params:{id:mongoose.Types.ObjectId}}){

   
    const id=await params.id;  //this is a item's  id 
    const data=await itemModal.findById(id);
  

    const ownerID=data?.user._id //as the params id is in string we convert it into a mongo db id to get the user info "sender" info
    
   
  
   


   
    return(
        <>
      <ChatClientpage  ownerID={ownerID.toString()} itemID={id.toString()}   />


        </>
    )
}




