"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Chat;
const jsx_runtime_1 = require("react/jsx-runtime");
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = __importDefault(require("./client"));
const itemmodel_1 = require("@/models/itemmodel");
async function Chat({ params }) {
    const id = (await params).id; //this is a item's  id 
    const data = await itemmodel_1.itemModal.findById(new mongoose_1.default.Types.ObjectId(id)); //then we are extracting the item detail
    const ownerID = data === null || data === void 0 ? void 0 : data.user._id; //this is the id of the owner of an item
    //we are passing both the owner's id as well as the item's id as the string.
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(client_1.default, { ownerID: ownerID.toString(), itemID: id }) }));
}
