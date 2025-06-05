import { userModal } from "@/models/usermodel";
import bcrypt from "bcryptjs";
import { connection } from "@/connectionconfig/connectionconfig";
import jwt from 'jsonwebtoken'
import { NextRequest,NextResponse } from "next/server";

const secretKey=process.env.JWT_KEY!;   //here ! sign means we are garauenteed that the value exists so that the ts wont throw an error.

connection();
export async function POST(req: NextRequest) {
  try {
    const reqBody=await req.json()   //here we are parsing the reqbody into js object.
    const {email, password } = await reqBody;
  const existingUser = await userModal.findOne({ email }); //here we are trying to search if the user with that mail exists or not .
  if (!existingUser) {
    return NextResponse.json({
      success: false,
      message: "User doesnot exist",
    },{status:400});
  }
  const validPW=await bcrypt.compare(password,existingUser.password);  //here we are checking if the password is valid or not.
  if(!validPW){
     return NextResponse.json({
      success: false,
      message: "Invalid password",
    },{status:401});

  }

  //if all of the conditions are valid then we assign a token to the signed in user.
 
  const token=jwt.sign({userID:existingUser._id},secretKey,{expiresIn:"1d"})   //here we are passing the user's mongodb id as the token so that it will be easier to find the user data later 
  const res= NextResponse.json({success:true,token:token,message:'successful signin'},{status:200});
  res.cookies.set('token',token,{httpOnly:true,path:'/'});  // then we are setting the cookies to the response provided after generating a token
  return res;



    
  } catch (error:any) {
    console.log(error.message);
    return NextResponse.json({success:false,error:error.message},{status:500})
    
  }
    


 
}
