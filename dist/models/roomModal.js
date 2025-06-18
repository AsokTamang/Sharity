"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomidModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roomIdschema = new mongoose_1.default.Schema({
    roomid: {
        type: String,
    }
}, {
    collection: 'rooms'
});
exports.roomidModal = mongoose_1.default.models.Room || mongoose_1.default.model('Room', roomIdschema);
