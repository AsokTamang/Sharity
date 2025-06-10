import { itemModal } from "@/models/itemmodel";
import { connection } from "@/connectionconfig/connectionconfig";
import { NextRequest,NextResponse } from "next/server";
import { userModal } from "@/models/usermodel";
import jwt from 'jsonwebtoken'


const secretKey=process.env.JWT_KEY!



connection();



export async function GET(req:NextRequest){

    try {
        const token=req.cookies.get('token')?.value||null;
          if (!token) {
      return NextResponse.json(
        { success: false, message: "Token not found!" },
        { status: 400 }
      );
    }
        const decoded=jwt.verify(token,secretKey);
        const userID=(decoded as any).userID;
        const loggedInUser=await userModal.findById(userID).lean();
     
       
        const datas=await itemModal.find({}).populate('user','email contact');   //here we are using the populate to show the user details also and we excluded the password detail
        console.log(datas);
        return NextResponse.json({success:true,message:'successfully fetched the items',data:datas,userID:userID,user:loggedInUser},{status:200})
        
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({success:false,message:error.message},{status:500})
        
    }
}