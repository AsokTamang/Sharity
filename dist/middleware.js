"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const server_1 = require("next/server");
const secretKey = process.env.JWT_KEY;
async function middleware(request) {
    var _a;
    const token = ((_a = request.cookies.get("token")) === null || _a === void 0 ? void 0 : _a.value) || ""; //here we are getting the token from the  cookies of the request if the value doesnot exisst then we set the token to null
    const publicpath = request.nextUrl.pathname.startsWith("/signin") ||
        request.nextUrl.pathname.startsWith("/signup"); //here we are making the signin and signup page public for the logic to be done
    if (token === "" && !publicpath) {
        //here we are checking if the token doesnot exist and if the user is trying to access the other pages then the users are restricted from accessing those pages.
        return server_1.NextResponse.redirect(new URL("/signin", request.nextUrl));
    }
    if (token && publicpath) {
        //here we are checking if the token does exist and if the user is trying to access the signin or signup pages then the users are restricted cause we dont want the users to visit the login or signup page without logging out first.
        return server_1.NextResponse.redirect(new URL("/main", request.nextUrl));
    }
    return server_1.NextResponse.next();
}
exports.config = {
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
