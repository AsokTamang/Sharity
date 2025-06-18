"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchItem;
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const input_1 = require("./ui/input");
const button_1 = require("./ui/button");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
function SearchItem() {
    const router = (0, navigation_1.useRouter)();
    const [query, setQuery] = react_1.default.useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios_1.default.get(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchbyname?itemName=${query}`, { withCredentials: true }); //we are passing the query as a url in the backend api
            const { data } = res.data;
            if (!data) {
                alert("No items found");
                return; //we must return if no data is found otherwise the bug will arise
            }
            ;
            router.push(`/seeitems/${data}`); //then we use that _id returned which is in the string format 
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    };
    const reset = () => {
        const form = document.querySelector(".search-form"); //we must give the  type to form
        if (form)
            form.reset();
    };
    return (<div className="flex flex-col items-center space-y-4 mt-6">
      <h1 className="text-3xl font-light font-serif">Search Item</h1>

      <form onSubmit={handleSubmit} className="search-form w-full max-w-md">
        <div className="flex flex-row gap-2">
          <input_1.Input name="query" placeholder="Enter item name..." className="flex-1" value={query} onChange={(e) => setQuery(e.target.value)}/>

          {query && (<button_1.Button onClick={reset} type="button" variant="outline" className="px-2" title="Reset">
              <lucide_react_1.X className="w-4 h-4"/>
            </button_1.Button>)}

          <button_1.Button type="submit" className="px-3" title="Search">
            <lucide_react_1.Search className="w-4 h-4"/>
          </button_1.Button>
        </div>
      </form>
    </div>);
}
