import ChattingClientpage from "./client"
import { itemModal } from "@/models/itemmodel"
import { userModal } from "@/models/usermodel"
import mongoose from "mongoose";
import { buyerModal } from "@/models/buyerModal";

export default async function Chattingpage({params}:{params:{id:string}}){
    const {id}=params;   //this is the id of an item which is in string format
    


   

    
    
  
    const buyerCollection=await buyerModal.find().populate('id','email contact').lean();   //here as our buyerModal has an id which is the reference of the user so we are using populate to find the email and contact of the buyer
     //and the above code fetches all the buyers info
     console.log(buyerCollection);
    const newBuyerCollection=buyerCollection.map((buyer)=>({   //here we are converting the _id of  datas of buyerCollection into string
        _id:buyer.id._id.toString(),
        email:buyer.id.email,
        contact:buyer.id.contact,
    }))
    console.log('buyer collection',newBuyerCollection);
    return(
        <>
        <ChattingClientpage itemID={id} buyers={newBuyerCollection}/>   {/**we are passsing the item's id and the item's owner id as the string as the props */}
        </>
    )
}