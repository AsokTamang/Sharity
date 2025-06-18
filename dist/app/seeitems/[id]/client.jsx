"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
const itemstore_1 = require("@/store/itemstore");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
function Client({ data }) {
    var _a, _b, _c, _d;
    const { name, image, description, condition, user: { email, contact }, } = data;
    const { userID } = (0, itemstore_1.itemStore)(); //as zustand's itemstore is a clientside store so we must use it within the client component
    return (<div className="bg-white shadow-lg rounded-xl w-full max-w-3xl mx-auto overflow-hidden p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl">
      {/* check if it's user's own item */}
      <p className="text-sm text-gray-500 font-medium">
        {userID === ((_b = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) ? "Your item" : "Other's item"}
      </p>

      {/* item image */}
      <image_1.default src={image} alt="item-image" width={365} height={200} className="rounded-xl object-cover h-[200px] w-full" priority={false}/>

      {/* item info */}
      <div className="flex flex-col gap-2 text-gray-800">
        <h2 className="text-xl font-bold">Item name: {name}</h2>

        <p className="text-sm">
          <span className="font-semibold">Description:</span> {description}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Condition:</span> {condition}
        </p>

        {/* show owner contact if logged-in user is not the owner */}
        {userID.toString() !== ((_c = data === null || data === void 0 ? void 0 : data.user) === null || _c === void 0 ? void 0 : _c._id.toString()) && (<div className="mt-4 bg-gray-50 p-4 rounded-lg border space-y-2">
            <h3 className="font-semibold text-sm">Owner Details</h3>
            <p className="text-sm">📧 Email: {email}</p>
            <p className="text-sm">📞 Contact: {contact}</p>

            <link_1.default href={`/chat/${data === null || data === void 0 ? void 0 : data._id}`}>
              <p className="text-base font-semibold text-green-700 hover:underline hover:text-green-800">
                chat with the owner
              </p>
            </link_1.default>
          
          </div>)}

        {/* when the logged in user is the owner of an item */}
        {userID === ((_d = data === null || data === void 0 ? void 0 : data.user) === null || _d === void 0 ? void 0 : _d._id.toString()) && (<link_1.default href={`/chatting/${data === null || data === void 0 ? void 0 : data._id}`}>
            <p className="text-base font-medium text-blue-600 hover:underline hover:text-blue-800">
              See your inbox
            </p>
          </link_1.default>)}
      </div>
    </div>);
}
