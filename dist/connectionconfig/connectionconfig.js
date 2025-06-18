"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connection = async () => {
    try {
        const connected = await mongoose_1.default.connect(process.env.MONGODB_URL); //here the ! sign makes sure that the url value exists.
        if (connected) {
            console.log('mongodb connection successful');
        }
        else {
            console.log('mongodb connection unsuccessful');
        }
    }
    catch (Error) {
        console.log(Error.message);
        process.exit(1);
    }
};
exports.connection = connection;
