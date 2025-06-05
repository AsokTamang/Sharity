import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/connectionconfig/connectionconfig";
import { itemModal } from "@/models/itemmodel";
import jwt from "jsonwebtoken";
import { userModal } from "@/models/usermodel";
connection();

const secretKey = process.env.JWT_KEY!;

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || null;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token not found!" },
        { status: 400 }
      );
    }
    const decoded = jwt.verify(token, secretKey); 
    const userID = (decoded as any).userID;

    const body = await req.json();
    const { id, name, description, image, condition } = body;
    const newItem = new itemModal({
      id,
      name,
      description,
      image,
      condition,
      user: userID,  //here the userID means the id of the user who is signed in and who is creating this item
    });

    const data = await newItem.save();
    
    console.log(data);
    
    return NextResponse.json(
      { success: true, data: data, message: "Item inserted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: 'The id you entered is already used, please enter another id' },
      { status: 500 }
    );
  }
}
