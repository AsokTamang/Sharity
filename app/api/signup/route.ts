import { userModal } from "@/models/usermodel";
import bcrypt from "bcryptjs";
import { connection } from "@/connectionconfig/connectionconfig";


import { NextRequest, NextResponse } from "next/server";

connection();
export async function POST(req: NextRequest) {
    try{
    const body=await req.json();
  const { username, email, password,contact } = await body;
  const existingUser = await userModal.findOne({ email }); //here we are trying to search if the user with that mail exists or not .
  if (existingUser) {
    return NextResponse.json({
      success: false,
      message: "This email is already taken by other user.",
    },{status:500

    });
  }
  const salt = await bcrypt.genSalt(10);
  const hassedPW = await bcrypt.hash(password, salt);

  const newUser = new userModal({
    //then we are passing the entered username,email and password from the user into the userModal
    username,
    email,
    password: hassedPW,
    contact
  });
  const data = await newUser.save(); //then we save that new user data into our database.
  return NextResponse.json({
    success: true,
    data: data,
    message: "Successfully signed up",
  },{status:200});
}
catch(Error:any){
   return NextResponse.json({success:false,error:Error.message},{status:500})
}
}
