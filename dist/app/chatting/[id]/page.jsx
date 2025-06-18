"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Chattingpage;
const client_1 = __importDefault(require("./client"));
const buyerModal_1 = require("@/models/buyerModal");
async function Chattingpage({ params }) {
    const id = (await params).id; //this is the id of an item which is in string format
    const buyerCollection = await buyerModal_1.buyerModal.find().populate('id', 'email contact').lean(); //here as our buyerModal has an id which is the reference of the user so we are using populate to find the email and contact of the buyer
    //and the above code fetches all the buyers info
    console.log(buyerCollection);
    const newBuyerCollection = buyerCollection.map((buyer) => ({
        _id: buyer.id._id.toString(),
        email: buyer.id.email,
        contact: buyer.id.contact,
    }));
    console.log('buyer collection', newBuyerCollection);
    return (<>
        <client_1.default itemID={id} buyers={newBuyerCollection}/>   {/**we are passsing the item's id and the item's owner id as the string as the props */}
        </>);
}
