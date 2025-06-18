"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Main;
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = __importDefault(require("react"));
const itemstore_1 = require("@/store/itemstore");
function Main() {
    const router = (0, navigation_1.useRouter)();
    const userID = (0, itemstore_1.itemStore)(state => state.userID);
    const Hydrated = (0, itemstore_1.itemStore)(state => state.Hydrated);
    react_1.default.useEffect(() => {
        if (!Hydrated)
            return;
        if (userID) {
            router.replace('/main');
        } //here we are checking if the user is loggedin then we prvent the loggedin user to go back to signin page cause user is pushed into this page from signin
    }, [userID, router, Hydrated]);
    return (<>
      {/* Top Action Buttons */}
      {Hydrated ?
            <>
      <div className="w-full flex flex-wrap justify-center gap-6 mt-6 px-4">
        <link_1.default href="/additem">
          <div className="p-6 bg-amber-100 rounded-xl shadow-md hover:bg-amber-300 hover:shadow-lg transition duration-200 cursor-pointer w-72 text-center">
            <span className="font-semibold text-lg text-gray-800">
              Post an Item for Sharing
            </span>
          </div>
        </link_1.default>

        <link_1.default href="/seeitems">
          <div className="p-6 bg-amber-100 rounded-xl shadow-md hover:bg-amber-300 hover:shadow-lg transition duration-200 cursor-pointer w-72 text-center">
            <span className="font-semibold text-lg text-gray-800">
              Browse Shared Items Available
            </span>
          </div>
        </link_1.default>
      </div>

      <main className="flex flex-col items-center justify-center mt-20 px-6 py-16 bg-amber-50 text-center rounded-xl shadow-md mx-4 lg:mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold italic text-amber-700 mb-4">
          Welcome to the Sharity Community
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Join millions of people in a shared mission — free up space by
          passing along unused items to those who need them. Together, we turn
          what’s no longer useful to one into something meaningful for another.
        </p>
      </main>
      </> : <div>Loading...</div>}
 
    </>);
}
