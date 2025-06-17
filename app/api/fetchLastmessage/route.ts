import { NextRequest, NextResponse } from "next/server";
import { messageModal } from "@/models/messagemodel";


export  async  function GET(req:NextRequest){
    const {searchParams}=new URL(req.url);
    const id=searchParams.get('room');
    try {
         const messages=await messageModal.find({roomId:id});  //we must use find inorder to display all the messages under the same roomid if we use findOne it will only return the single object.
         return NextResponse.json({success:true,data:messages},{status:200})

    } catch (error) {
        return NextResponse.json({success:false,data:''},{status:500});
        
    }
   




   
}