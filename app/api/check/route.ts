import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const token=req.cookies.get('token')?.value;   //here we are checking if the token exists or not
   try {
     if(token){
        return NextResponse.json({success:true})
    }
    else{
          return NextResponse.json({success:false})

    }
   } catch (error:unknown) {
    if(error instanceof Error){
    return NextResponse.json({success:false,message:error.message})}
    
   }
   

    
}