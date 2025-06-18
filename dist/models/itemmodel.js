"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: [true, "please provide a valid id"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "please provide a name of an item"],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: [true, "please provide a valid image url"],
        validation: {
            validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(v)
        }
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId, //here we are having this user field whose type is the mongodb Id , and it is the reference to the another model called User 
        ref: 'User',
        required: true,
        index: true,
    },
    condition: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'items',
});
exports.itemModal = mongoose_1.default.models.Item || mongoose_1.default.model("Item", itemSchema); //here we are creating the collelction named Item with the schema itemSchema. and we must use mongoose.models.modelname so that the mongo db wont try to overrider the existing model due to nextjs route handling feature.
