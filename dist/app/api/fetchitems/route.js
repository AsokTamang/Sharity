"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const itemmodel_1 = require("@/models/itemmodel");
const connectionconfig_1 = require("@/connectionconfig/connectionconfig");
const server_1 = require("next/server");
const usermodel_1 = require("@/models/usermodel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_KEY;
(0, connectionconfig_1.connection)();
async function GET(req) {
    var _a;
    try {
        const token = (_a = req.cookies.get('token')) === null || _a === void 0 ? void 0 : _a.value;
        if (!token) {
            return server_1.NextResponse.json({ success: false, message: "Token not found!" }, { status: 400 });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey); //we are defining the type for a userID inour decoded type
        const userID = (decoded).userID;
        const loggedInUser = await usermodel_1.userModal.findById(userID).lean();
        const datas = await itemmodel_1.itemModal.find({}).populate('user', 'email contact'); //here we are using the populate to show the user details also and we excluded the password detail
        return server_1.NextResponse.json({ success: true, message: 'successfully fetched the items', data: datas, userID: userID, user: loggedInUser }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return server_1.NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
    }
}
