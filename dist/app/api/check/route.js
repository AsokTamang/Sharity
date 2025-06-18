"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
async function GET(req) {
    var _a;
    const token = (_a = req.cookies.get('token')) === null || _a === void 0 ? void 0 : _a.value; //here we are checking if the token exists or not
    try {
        if (token) {
            return server_1.NextResponse.json({ success: true });
        }
        else {
            return server_1.NextResponse.json({ success: false });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return server_1.NextResponse.json({ success: false, message: error.message });
        }
    }
}
