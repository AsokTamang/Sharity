"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const connectionconfig_1 = require("@/connectionconfig/connectionconfig");
const itemmodel_1 = require("@/models/itemmodel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, connectionconfig_1.connection)();
const secretKey = process.env.JWT_KEY;
async function POST(req) {
    var _a;
    try {
        const token = ((_a = req.cookies.get("token")) === null || _a === void 0 ? void 0 : _a.value) || null;
        if (!token) {
            return server_1.NextResponse.json({ success: false, message: "Token not found!" }, { status: 400 });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey); //by defining the propertyy here we can easily use the userID.
        const userID = decoded.userID;
        const body = await req.json();
        const { id, name, description, image, condition } = body;
        const newItem = new itemmodel_1.itemModal({
            id,
            name,
            description,
            image,
            condition,
            user: userID, //here the userID means the id of the user who is signed in and who is creating this item
        });
        const data = await newItem.save();
        console.log(data);
        return server_1.NextResponse.json({ success: true, data: data, message: "Item inserted successfully" }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return server_1.NextResponse.json({ success: false, message: 'The id you entered is already used, please enter another id' }, { status: 500 });
        }
    }
}
