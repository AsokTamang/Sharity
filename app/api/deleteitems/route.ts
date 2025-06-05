import { NextRequest,NextResponse } from "next/server";
import { itemModal } from "@/models/itemmodel";
import { userModal } from "@/models/usermodel";
export async function DELETE(req:NextRequest){
    const {id}=await req.json();
  
    if(!id){
         return NextResponse.json({success:false,message:'Please provide an id'},{status:500})
    }

    try {
            const deletedData=await itemModal.findByIdAndDelete(id);
            if(!deletedData){
                return NextResponse.json({success:false,message:'Item not found'},{status:500})
            }
            return NextResponse.json({success:true,message:'Item deleted successfully',data:deletedData},{status:200})
        
    } catch (error:any) {
        console.log(error?.message);
        return NextResponse.json({success:false,message:error?.message},{status:500})
        
    }


    



}