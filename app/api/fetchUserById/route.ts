import { NextRequest, NextResponse } from "next/server";
import { userModal } from "@/models/usermodel";
export async function GET(req:NextRequest) {
    const body=await req.json()
    const {id}=body
    try {
         const data= await userModal.findById(id);
   if(!data){
    return NextResponse.json({success:false,data:null,message:'data fetched unsuccessfull'},{status:500})
   }
   return NextResponse.json({success:true,data:data,message:'data fetched successfull'},{status:200})
        
    } catch (error:any) {
        console.log(error.message);
         return NextResponse.json({success:false,data:null,message:'data fetched unsuccessfull'},{status:500})


        
    }
  

    
}