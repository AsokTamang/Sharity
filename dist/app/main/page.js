"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Main;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
function Main() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-wrap justify-center gap-6 mt-6 px-4", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/additem", children: (0, jsx_runtime_1.jsx)("div", { className: "p-6 bg-amber-100 rounded-xl shadow-md hover:bg-amber-300 hover:shadow-lg transition duration-200 cursor-pointer w-72 text-center", children: (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-lg text-gray-800", children: "Post an Item for Sharing" }) }) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/seeitems", children: (0, jsx_runtime_1.jsx)("div", { className: "p-6 bg-amber-100 rounded-xl shadow-md hover:bg-amber-300 hover:shadow-lg transition duration-200 cursor-pointer w-72 text-center", children: (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-lg text-gray-800", children: "Browse Shared Items Available" }) }) })] }), (0, jsx_runtime_1.jsxs)("main", { className: "flex flex-col items-center justify-center mt-20 px-6 py-16 bg-amber-50 text-center rounded-xl shadow-md mx-4 lg:mx-auto max-w-4xl", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold italic text-amber-700 mb-4", children: "Welcome to the Sharity Community" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 text-lg leading-relaxed", children: "Join millions of people in a shared mission \u2014 free up space by passing along unused items to those who need them. Together, we turn what\u2019s no longer useful to one into something meaningful for another." })] })] }) }));
}
