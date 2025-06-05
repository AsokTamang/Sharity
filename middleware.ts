import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { userModal } from "./models/usermodel";

const secretKey = process.env.JWT_KEY!;
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null; //here we are getting the token from the  cookies of the request if the value doesnot exisst then we set the token to null
  const publicpath =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup"); //here we are making the signin and signup page public for the logic to be done

  if (!token && !publicpath) {
    //here we are checking if the token doesnot exist and if the user is trying to access the other pages then the users are restricted from accessing those pages.
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
  if (token && publicpath) {
    //here we are checking if the token does exist and if the user is trying to access the signin or signup pages then the users are restricted cause we dont want the users to visit the login or signup page without logging out first.
    return NextResponse.redirect(new URL("/main", request.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/signin",
    "/signup",
    "/signout",
    "/main",
  ],
};
