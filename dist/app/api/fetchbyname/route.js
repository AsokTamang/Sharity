"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const itemmodel_1 = require("@/models/itemmodel");
const connectionconfig_1 = require("@/connectionconfig/connectionconfig");
async function GET(req) {
    const { searchParams } = new URL(req.url); //this is for retrieving the item name from the url
    const name = searchParams.get("itemName"); //as we have used the itemName in the url as a query
    try {
        await (0, connectionconfig_1.connection)();
        const data = await itemmodel_1.itemModal.findOne({ name: { $regex: name, $options: 'i' } }); //here $regex makes the check of the item name flexible and options make the check insensitive.
        console.log('finding data by name', data);
        if (!data) {
            return server_1.NextResponse.json({ success: false, data: null, message: "data fetched unsuccessfull" }, { status: 500 });
        }
        return server_1.NextResponse.json({ success: true, data: data._id.toString(), message: "data fetched successfull" }, //we are passing the _id of the data into string.
        { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return server_1.NextResponse.json({ success: false, data: null, message: "data fetched unsuccessfull" }, { status: 500 });
        }
    }
}
