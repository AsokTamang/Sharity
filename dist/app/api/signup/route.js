"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const usermodel_1 = require("@/models/usermodel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connectionconfig_1 = require("@/connectionconfig/connectionconfig");
const server_1 = require("next/server");
(0, connectionconfig_1.connection)();
async function POST(req) {
    try {
        const body = await req.json();
        const { username, email, password, contact } = await body;
        const existingUser = await usermodel_1.userModal.findOne({ email }); //here we are trying to search if the user with that mail exists or not .
        if (existingUser) {
            return server_1.NextResponse.json({
                success: false,
                message: "This email is already taken by other user.",
            }, { status: 500
            });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hassedPW = await bcryptjs_1.default.hash(password, salt);
        const newUser = new usermodel_1.userModal({
            //then we are passing the entered username,email and password from the user into the userModal
            username,
            email,
            password: hassedPW,
            contact
        });
        const data = await newUser.save(); //then we save that new user data into our database.
        return server_1.NextResponse.json({
            success: true,
            data: data,
            message: "Successfully signed up",
        }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            return server_1.NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }
}
