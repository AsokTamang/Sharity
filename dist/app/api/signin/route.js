"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const usermodel_1 = require("@/models/usermodel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connectionconfig_1 = require("@/connectionconfig/connectionconfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("next/server");
const secretKey = process.env.JWT_KEY; //here ! sign means we are garauenteed that the value exists so that the ts wont throw an error.
(0, connectionconfig_1.connection)();
async function POST(req) {
    try {
        const reqBody = await req.json(); //here we are parsing the reqbody into js object.
        const { email, password } = await reqBody;
        const existingUser = await usermodel_1.userModal.findOne({ email }); //here we are trying to search if the user with that mail exists or not .
        if (!existingUser) {
            return server_1.NextResponse.json({
                success: false,
                message: "User doesnot exist",
            }, { status: 400 });
        }
        const validPW = await bcryptjs_1.default.compare(password, existingUser.password); //here we are checking if the password is valid or not.
        if (!validPW) {
            return server_1.NextResponse.json({
                success: false,
                message: "Invalid password",
            }, { status: 401 });
        }
        //if all of the conditions are valid then we assign a token to the signed in user.
        const token = jsonwebtoken_1.default.sign({ userID: existingUser._id }, secretKey, { expiresIn: "1d" }); //here we are passing the user's mongodb id as the token so that it will be easier to find the user data later 
        const res = server_1.NextResponse.json({ success: true, token: token, message: 'successful signin' }, { status: 200 });
        res.cookies.set('token', token, { httpOnly: true, path: '/',
            sameSite: 'lax', //we are using samesite:lax inorder to prevent the cross-site issue
        }); // then we are setting the cookies to the response provided after generating a token
        return res;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return server_1.NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }
}
