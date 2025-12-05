"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
const jsx_runtime_1 = require("react/jsx-runtime");
const itemstore_1 = require("@/store/itemstore");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
function Client({ data }) {
    var _a, _b, _c, _d;
    const { name, image, description, condition, user: { email, contact }, } = data;
    const { userID } = (0, itemstore_1.itemStore)(); //as zustand's itemstore is a clientside store so we must use it within the client component
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white shadow-lg rounded-xl w-full max-w-3xl mx-auto overflow-hidden p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 font-medium", children: userID === ((_b = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) ? "Your item" : "Other's item" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: image, alt: "item-image", width: 365, height: 200, className: "rounded-xl object-cover h-[200px] w-full", priority: false }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 text-gray-800", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "text-xl font-bold", children: ["Item name: ", name] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Description:" }), " ", description] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Condition:" }), " ", condition] }), userID.toString() !== ((_c = data === null || data === void 0 ? void 0 : data.user) === null || _c === void 0 ? void 0 : _c._id.toString()) && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 bg-gray-50 p-4 rounded-lg border space-y-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-sm", children: "Owner Details" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: ["\uD83D\uDCE7 Email: ", email] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: ["\uD83D\uDCDE Contact: ", contact] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: `/chat/${data === null || data === void 0 ? void 0 : data._id}`, children: (0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-green-700 hover:underline hover:text-green-800", children: "chat with the owner" }) })] })), userID === ((_d = data === null || data === void 0 ? void 0 : data.user) === null || _d === void 0 ? void 0 : _d._id.toString()) && ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/chatting/${data === null || data === void 0 ? void 0 : data._id}`, children: (0, jsx_runtime_1.jsx)("p", { className: "text-base font-medium text-blue-600 hover:underline hover:text-blue-800", children: "See your inbox" }) }) //i used anchor tag here cause it will do the full page reload so that there will be new socket connection and we can see the latest chat messages.
                    )] })] }));
}
