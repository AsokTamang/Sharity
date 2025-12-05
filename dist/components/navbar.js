"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const axios_1 = __importDefault(require("axios"));
const navigation_1 = require("next/navigation");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_1 = __importDefault(require("react"));
const globalstate_1 = require("@/store/globalstate");
function Navbar() {
    const { loggedin, setloggedin } = (0, globalstate_1.authStore)();
    const router = (0, navigation_1.useRouter)();
    react_1.default.useEffect(() => {
        (async () => {
            try {
                const res = await axios_1.default.get(`${process.env.NEXT_PUBLIC_API_URL}/api/check`, { withCredentials: true });
                const { success } = res.data;
                setloggedin(success);
            }
            catch (error) {
                if (error instanceof Error) {
                    setloggedin(false);
                    console.error(error.message);
                }
            }
        })();
    }, [setloggedin]);
    const handleSignOut = async () => {
        try {
            const res = await axios_1.default.get(`${process.env.NEXT_PUBLIC_API_URL}/api/signout`, { withCredentials: true });
            const { success } = res.data;
            if (success) {
                router.push("/");
                setloggedin(false);
                window.location.reload(); //here after clicking this logout button we are reloading the page so that it will be back to normal functionality.
            }
        }
        catch (error) {
            if (error instanceof Error) {
                setloggedin(true);
                react_hot_toast_1.default.error(error.message);
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("nav", { className: "flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-amber-500", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", className: "hover:text-amber-600 transition-colors duration-200", children: "Sharity" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-6 text-gray-700 font-medium", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", className: "hover:text-amber-600 transition-colors duration-200", children: "Home" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/main", className: "hover:text-amber-600 transition-colors duration-200", children: "Main" }), !loggedin && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/signup", className: "hover:text-amber-600 transition-colors duration-200", children: "Signup" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/signin", className: "hover:text-amber-600 transition-colors duration-200", children: "Signin" })] })), loggedin && ((0, jsx_runtime_1.jsx)("button", { onClick: handleSignOut, className: "bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition", children: "Sign Out" }))] })] }));
}
