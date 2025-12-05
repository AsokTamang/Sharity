"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Detail;
const jsx_runtime_1 = require("react/jsx-runtime");
const itemmodel_1 = require("@/models/itemmodel");
const connectionconfig_1 = require("@/connectionconfig/connectionconfig");
const client_1 = __importDefault(require("./client"));
async function Detail({ params }) {
    var _a;
    const id = (await params).id; //here we are destructuring the id from the params 
    await (0, connectionconfig_1.connection)();
    const data = await itemmodel_1.itemModal.findById(id).populate('user', 'email contact'); //then we try to fetch the item data using mongoose model and also populating the user data of that specific item
    const item = data.toObject(); //here we are passing the mongoose document into object so it wont cause bug while passing this data as a prop in our client side page which is a part of this current page cause mongoose documnet cannot be passed as a prop directly which can cause bundle size error
    item._id = item._id.toString(); //then we are also convering the item's id intro string
    item.user._id = (_a = item === null || item === void 0 ? void 0 : item.user) === null || _a === void 0 ? void 0 : _a._id.toString(); //same here for user
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(client_1.default, { data: item }) }));
}
