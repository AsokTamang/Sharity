"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const messagemodel_1 = require("@/models/messagemodel");
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('room');
    try {
        const messages = await messagemodel_1.messageModal.find({ roomId: id }); //we must use find inorder to display all the messages under the same roomid if we use findOne it will only return the single object.
        return server_1.NextResponse.json({ success: true, data: messages }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            return server_1.NextResponse.json({ success: false, data: '', message: error.message }, { status: 500 });
        }
    }
}
