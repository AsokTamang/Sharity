"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = DELETE;
const server_1 = require("next/server");
const itemmodel_1 = require("@/models/itemmodel");
async function DELETE(req) {
    const { id } = await req.json();
    if (!id) {
        return server_1.NextResponse.json({ success: false, message: 'Please provide an id' }, { status: 500 });
    }
    try {
        const deletedData = await itemmodel_1.itemModal.findByIdAndDelete(id);
        if (!deletedData) {
            return server_1.NextResponse.json({ success: false, message: 'Item not found' }, { status: 500 });
        }
        return server_1.NextResponse.json({ success: true, message: 'Item deleted successfully', data: deletedData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error === null || error === void 0 ? void 0 : error.message);
            return server_1.NextResponse.json({ success: false, message: error === null || error === void 0 ? void 0 : error.message }, { status: 500 });
        }
    }
}
