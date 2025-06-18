"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const buyerSchema = new mongoose_1.default.Schema({
    id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User', //this buyer id is also an id of one of the userID
        unique: true,
    },
}, {
    collection: 'buyers'
});
exports.buyerModal = mongoose_1.default.models.Buyer || mongoose_1.default.model('Buyer', buyerSchema);
