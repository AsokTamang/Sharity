import { NextRequest, NextResponse } from "next/server";
import { roomModal } from "@/models/roommodel";
export async function GET(req:NextRequest) {
   
    try {
         const data= await roomModal.find({});   //here we are just fetching the roomdata
   if(!data){
    return NextResponse.json({success:false,data:null,message:'room data fetched unsuccessfull'},{status:500})
   }
   return NextResponse.json({success:true,data:data,message:'room data fetched successfull'},{status:200})
        
    } catch (error:any) {
        console.log(error.message);
         return NextResponse.json({success:false,data:null,message:'room data fetched unsuccessfull'},{status:500})


        
    }
  

    
}