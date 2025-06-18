"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUT = PUT;
const server_1 = require("next/server");
const itemmodel_1 = require("@/models/itemmodel");
async function PUT(req) {
    const { id, updateditem } = await req.json();
    if (!id) {
        return server_1.NextResponse.json({ success: false, message: 'item not found' }, { status: 500 });
    }
    try {
        const updatedData = await itemmodel_1.itemModal.findByIdAndUpdate(id, updateditem, { new: true }); //here new:true makes the new updated data to replace the existing one.
        console.log(updatedData);
        if (!updatedData) {
            return server_1.NextResponse.json({ success: false, message: 'Item not found or  updation unsuccessful' }, { status: 500 });
        }
        return server_1.NextResponse.json({ success: true, message: 'Item updated successfully', data: updatedData }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error === null || error === void 0 ? void 0 : error.message);
            return server_1.NextResponse.json({ success: false, message: error === null || error === void 0 ? void 0 : error.message }, { status: 500 });
        }
    }
}
