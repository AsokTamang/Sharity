"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        min: 3,
        required: [true, 'please provide a valid username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'please provide a valid email'],
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        required: [true, 'please provide a valid password'],
        unique: true,
    },
    contact: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'users',
});
exports.userModal = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema); //here we are creating the database named next with the schema userSchema. and we must use mongoose.models.modelname so that the mongo db wont try to overrider the existing model due to nextjs route handling feature.
