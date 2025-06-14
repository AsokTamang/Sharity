import { NextRequest, NextResponse } from "next/server";
import { itemModal } from "@/models/itemmodel";
import { connection } from "@/connectionconfig/connectionconfig";
export async function GET(req: NextRequest) {
 
  const { searchParams } = new URL(req.url);  //this is for retrieving the item name from the url
  const name = searchParams.get("itemName");  //as we have used the itemName in the url as a query
  try {
    await connection(); 
    const data=await itemModal.findOne({name:{$regex:name,$options:'i'}});    //here $regex makes the check of the item name flexible and options make the check insensitive.
    console.log('finding data by name',data);
       
    
    if (!data) {
      return NextResponse.json(
        { success: false, data: null, message: "data fetched unsuccessfull" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, data: data, message: "data fetched successfull" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, data: null, message: "data fetched unsuccessfull" },
      { status: 500 }
    );
  }
}
