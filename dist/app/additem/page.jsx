"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signup;
const react_1 = __importDefault(require("react"));
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const textarea_1 = require("@/components/ui/textarea");
const navigation_1 = require("next/navigation");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const axios_1 = __importDefault(require("axios"));
function Signup() {
    const router = (0, navigation_1.useRouter)();
    const [item, setItem] = react_1.default.useState({
        id: "",
        name: "",
        description: "",
        image: "",
        condition: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios_1.default.post("/api/additems", item);
            const { success, message, error } = res.data;
            if (success) {
                react_hot_toast_1.default.success(message);
                setTimeout(() => router.push("/main"), 1000);
            }
            else {
                react_hot_toast_1.default.error(message);
                console.log(error);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                react_hot_toast_1.default.error(error.message || "Submission failed");
            }
        }
    };
    return (<div className="min-h-screen bg-amber-50 py-10 px-6 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center text-amber-700">
          Add an Item for Sharing
        </h1>

        {/** ID */}
        <div>
          <label htmlFor="id" className="block font-medium mb-1">
            Item ID
          </label>
          <input_1.Input id="id" name="id" value={item.id} onChange={(e) => setItem(Object.assign(Object.assign({}, item), { id: e.target.value }))} placeholder="Unique item identifier" required/>
        </div>

        
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Item Name
          </label>
          <input_1.Input id="name" name="name" value={item.name} onChange={(e) => setItem(Object.assign(Object.assign({}, item), { name: e.target.value }))} placeholder="What’s the name of your item?" required/>
        </div>

        {/** Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea_1.Textarea id="description" name="description" value={item.description} onChange={(e) => setItem(Object.assign(Object.assign({}, item), { description: e.target.value }))} placeholder="Describe the features of your item" required/>
        </div>

        {/** Image */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Image URL
          </label>
          <input_1.Input id="image" name="image" value={item.image} onChange={(e) => setItem(Object.assign(Object.assign({}, item), { image: e.target.value }))} placeholder="Paste a direct image URL" required/>
        </div>

      
        <div>
          <label htmlFor="condition" className="block font-medium mb-1">
            Condition
          </label>
          <input_1.Input id="condition" name="condition" value={item.condition} onChange={(e) => setItem(Object.assign(Object.assign({}, item), { condition: e.target.value }))} placeholder="e.g., New, Gently used, Needs repair" required/>
        </div>

        <button_1.Button type="submit" className="w-full bg-amber-300 hover:bg-amber-400 text-black font-semibold py-3 rounded-xl shadow-md transition">
          Add Item
        </button_1.Button>
      </form>
    </div>);
}
