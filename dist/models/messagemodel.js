"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    },
    roomId: {
        type: String,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'messages'
});
exports.messageModal = mongoose_1.default.models.Message || mongoose_1.default.model('Message', messageSchema);
