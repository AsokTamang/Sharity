"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const link_1 = __importDefault(require("next/link"));
const axios_1 = __importDefault(require("axios"));
const navigation_1 = require("next/navigation");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_1 = __importDefault(require("react"));
const globalstate_1 = require("@/store/globalstate");
const chatStore_1 = require("@/store/chatStore");
function Navbar() {
    const { reset } = (0, chatStore_1.chatStore)();
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
                reset(); // Reset Zustand store
            }
        }
        catch (error) {
            if (error instanceof Error) {
                setloggedin(true);
                react_hot_toast_1.default.error(error.message);
            }
        }
    };
    return (<nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-amber-500">
        <link_1.default href="/" className="hover:text-amber-600 transition-colors duration-200">Sharity</link_1.default></div>
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <link_1.default href="/" className="hover:text-amber-600 transition-colors duration-200">
          Home
        </link_1.default>
        <link_1.default href="/main" className="hover:text-amber-600 transition-colors duration-200">
          Main
        </link_1.default>

        {!loggedin && (<>
            <link_1.default href="/signup" className="hover:text-amber-600 transition-colors duration-200">
              Signup
            </link_1.default>
            <link_1.default href="/signin" className="hover:text-amber-600 transition-colors duration-200">
              Signin
            </link_1.default>
          </>)}

        {loggedin && (<button onClick={handleSignOut} className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition">
            Sign Out
          </button>)}
      </div>
    </nav>);
}
