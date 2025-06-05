import { NextRequest, NextResponse } from "next/server";
import { itemModal } from "@/models/itemmodel";

export async function GET(req:NextRequest) {
    const body=await req.json()
    const {id}=body
    try {
         const data= await itemModal.findById(id).populate('user','email contact');
   if(!data){
    return NextResponse.json({success:false,data:null,message:'data fetched unsuccessfull'},{status:500})
   }
   return NextResponse.json({success:true,data:data,message:'data fetched successfull'},{status:200})
        
    } catch (error:any) {
        console.log(error.message);
         return NextResponse.json({success:false,data:null,message:'data fetched unsuccessfull'},{status:500})


        
    }
  

    
}