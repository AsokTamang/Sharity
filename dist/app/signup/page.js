"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signup;
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
function Signup() {
    const router = (0, navigation_1.useRouter)();
    const [user, setUser] = react_1.default.useState({
        username: "",
        email: "",
        password: "",
        contact: "",
    });
    const [loading, setLoading] = react_1.default.useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios_1.default.post(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, user, { withCredentials: true }); //here as we are using the axios we can only retrieve the data or anything returned by our backedn using the . data only
            const { success, message } = response.data;
            if (success) {
                react_hot_toast_1.default.success(message);
                setTimeout(() => router.push("/signin"), 100);
            }
            else {
                react_hot_toast_1.default.error(message || "Signup failed");
            }
        }
        catch (error) {
            if (error instanceof Error) {
                react_hot_toast_1.default.error(error.message);
                console.error(error.message);
            }
            else {
                react_hot_toast_1.default.error("An unknown error occurred");
            }
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)("main", { className: "min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md bg-white rounded-lg shadow-lg p-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-semibold mb-6 text-center text-gray-800", children: "Create an Account" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: (e) => {
                        e.preventDefault();
                        handleSubmit();
                    }, className: "space-y-5", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "username", className: "block text-gray-700 font-medium mb-2", children: "Username" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", id: "username", name: "username", value: user.username, onChange: (e) => setUser(Object.assign(Object.assign({}, user), { username: e.target.value })), placeholder: "Enter your username", required: true, className: "w-full" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", className: "block text-gray-700 font-medium mb-2", children: "Email Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "email", id: "email", name: "email", value: user.email, onChange: (e) => setUser(Object.assign(Object.assign({}, user), { email: e.target.value })), placeholder: "Enter your email", required: true, className: "w-full" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password", className: "block text-gray-700 font-medium mb-2", children: "Password" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "password", id: "password", name: "password", value: user.password, onChange: (e) => setUser(Object.assign(Object.assign({}, user), { password: e.target.value })), placeholder: "Enter a secure password", required: true, className: "w-full" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "contact", className: "block text-gray-700 font-medium mb-2", children: "Contact Number" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "tel", id: "contact", name: "contact", value: user.contact, onChange: (e) => setUser(Object.assign(Object.assign({}, user), { contact: e.target.value })), placeholder: "Enter your contact number", required: true, className: "w-full", pattern: "[0-9+]{7,15}", title: "Please enter a valid contact number" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: loading, className: "w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Signing Up..." : "Sign Up" })] })] }) }));
}
