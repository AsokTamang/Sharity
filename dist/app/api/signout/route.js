"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
async function GET() {
    try {
        const res = server_1.NextResponse.json({ success: true, message: "Signed out successfully" }, { status: 200 });
        res.cookies.set("token", "", { httpOnly: true, path: "/" });
        console.log(res.cookies);
        return res;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return server_1.NextResponse.json({ success: false, message: "Sign out unsuccessful" }, { status: 500 });
        }
    }
}
