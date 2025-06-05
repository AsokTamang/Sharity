import { NextRequest,NextResponse } from "next/server";
import { itemModal } from "@/models/itemmodel";
import { userModal } from "@/models/usermodel";
export async function PUT(req:NextRequest){
    const {id,updateditem}=await req.json();
  
    if(!id){
         return NextResponse.json({success:false,message:'item not found'},{status:500})
    }

    try {
            const updatedData=await itemModal.findByIdAndUpdate(id,updateditem,{new:true})  //here new:true makes the new updated data to replace the existing one.
             console.log(updatedData);
            if(!updatedData){
                return NextResponse.json({success:false,message:'Item not found or  updation unsuccessful'},{status:500})
               
            }
            return NextResponse.json({success:true,message:'Item updated successfully',data:updatedData},{status:200})
        
    } catch (error:any) {
        console.log(error?.message);
        return NextResponse.json({success:false,message:error?.message},{status:500})
        
    }


    



}