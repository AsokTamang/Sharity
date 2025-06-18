"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signin;
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const globalstate_1 = require("@/store/globalstate");
const link_1 = __importDefault(require("next/link"));
function Signin() {
    const { setloggedin } = (0, globalstate_1.authStore)();
    const router = (0, navigation_1.useRouter)();
    const [user, setUser] = react_1.default.useState({ email: "", password: "" });
    const [loading, setLoading] = react_1.default.useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios_1.default.post(`${process.env.NEXT_PUBLIC_API_URL}/api/signin`, user); //here as we are using the axios we can only retrieve the data or anything returned by our backedn using the . data only
            const { success, message } = response.data;
            if (success) {
                setloggedin(true);
                react_hot_toast_1.default.success(message);
                router.push("/main"); //instead of using push we must use replace of router inorder to prevent the user to go back to the previous page hitting the back button because replace replaces the previous page url with this entered page url inside a  history stack.
            }
            else {
                setloggedin(false);
                react_hot_toast_1.default.error(message || "Sign in failed");
            }
        }
        catch (error) {
            if (error instanceof Error) {
                setloggedin(false);
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
    return (<main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Sign In to Your Account
        </h1>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input_1.Input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser(Object.assign(Object.assign({}, user), { email: e.target.value }))} placeholder="Enter your email" required className="w-full"/>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input_1.Input type="password" id="password" name="password" value={user.password} onChange={(e) => setUser(Object.assign(Object.assign({}, user), { password: e.target.value }))} placeholder="Enter your password" required className="w-full"/>
          </div>

          <button_1.Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Signing In..." : "Sign In"}
          </button_1.Button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <link_1.default href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign up
          </link_1.default>
        </p>
      </div>
    </main>);
}
