"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fetching;
const itemstore_1 = require("@/store/itemstore");
const globalstate_1 = require("@/store/globalstate");
const react_1 = __importDefault(require("react"));
const image_1 = __importDefault(require("next/image"));
const next_icons_1 = require("@deemlol/next-icons");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const input_1 = require("@/components/ui/input");
const link_1 = __importDefault(require("next/link"));
const searchItem_1 = __importDefault(require("@/components/searchItem"));
function Fetching() {
    const { items, fetchItems, deleteItems, userID, updateItems } = (0, itemstore_1.itemStore)();
    const { opened, setopened, updatedItem, setupdatedItem, activeId, setactiveId, } = (0, globalstate_1.authStore)();
    // fetching all items once component mounts
    react_1.default.useEffect(() => {
        fetchItems();
    }, [fetchItems]);
    // delete an item
    const handlesubmit = async (id) => {
        const { success, message } = await deleteItems(id);
        try {
            if (success) {
                react_hot_toast_1.default.success(message);
            }
            else {
                react_hot_toast_1.default.error(message);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                react_hot_toast_1.default.error(error.message);
            }
        }
    };
    // update an item
    const handlesubmit2 = async (id, newData) => {
        const { success, message } = await updateItems(id, newData);
        try {
            if (success) {
                react_hot_toast_1.default.success(message);
                setopened(false);
                setactiveId("");
                setupdatedItem({
                    name: "",
                    image: "",
                    description: "",
                    condition: "",
                });
                fetchItems();
            }
            else {
                react_hot_toast_1.default.error(message);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                react_hot_toast_1.default.error(error.message);
            }
        }
    };
    // loop through each item to display
    const elements = items === null || items === void 0 ? void 0 : items.map((item, index) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (<div key={index} className="bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col gap-3 transition duration-300 hover:shadow-2xl">
      <link_1.default href={`/seeitems/${item._id}`} className="hover:text-green-500">
        Visit this page
      </link_1.default>

      <p className="text-sm text-gray-500 font-medium">
        {userID === ((_b = (_a = item === null || item === void 0 ? void 0 : item.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) ? "Your item" : "Other's item"}
      </p>

      <image_1.default src={item.image} alt="item-image" width={365} height={200} className="rounded-xl object-cover h-[200px] w-full" priority={false}/>

      <div className="flex flex-col gap-1 text-gray-800">
        <h2 className="text-lg font-bold">Item name: {item === null || item === void 0 ? void 0 : item.name}</h2>
        <p className="text-sm">
          <span className="font-semibold">Description:</span>{" "}
          {item === null || item === void 0 ? void 0 : item.description}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Condition:</span> {item === null || item === void 0 ? void 0 : item.condition}
        </p>

        {userID !== ((_d = (_c = item === null || item === void 0 ? void 0 : item.user) === null || _c === void 0 ? void 0 : _c._id) === null || _d === void 0 ? void 0 : _d.toString()) && (<div className="mt-3 bg-gray-50 p-3 rounded-md border">
            <h3 className="font-semibold text-sm">Owner Details</h3>
            <p className="text-sm">📧 Email: {(_e = item === null || item === void 0 ? void 0 : item.user) === null || _e === void 0 ? void 0 : _e.email}</p>
            <p className="text-sm">📞 Contact: {(_f = item === null || item === void 0 ? void 0 : item.user) === null || _f === void 0 ? void 0 : _f.contact}</p>
          </div>)}

        <div className="mt-4 flex gap-4">
          {userID === ((_h = (_g = item === null || item === void 0 ? void 0 : item.user) === null || _g === void 0 ? void 0 : _g._id) === null || _h === void 0 ? void 0 : _h.toString()) && (<>
              {/* delete button */}
              <button onClick={() => handlesubmit(item._id)} className="text-red-600 hover:text-red-800 transition" title="Delete Item">
                <next_icons_1.Trash size={24}/>
              </button>

              {/* edit button */}
              <button onClick={() => {
                    setupdatedItem({
                        name: item.name,
                        description: item.description,
                        image: item.image,
                        condition: item.condition,
                    });
                    setopened(true);
                    setactiveId(item._id.toString());
                }} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                Edit
              </button>
            </>)}
        </div>
      </div>
    </div>);
    });
    return (<div className="flex flex-col items-center justify-center px-4">
      {/* search component */}
      <searchItem_1.default />

      {/* grid view for items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full max-w-[1400px]">
        {elements}
      </div>

      {/* popup for editing items */}
      {opened && (<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-center">Update Item</h2>

            {/* input fields */}
            <div className="space-y-3">
              {["name", "description", "image", "condition"].map((field) => (<div key={field} className="space-y-1">
                  <label className="block text-sm font-medium capitalize text-gray-700">
                    {field}:
                  </label>
                  <input_1.Input name={field} type="text" value={updatedItem === null || updatedItem === void 0 ? void 0 : updatedItem[field]} onChange={(e) => setupdatedItem(Object.assign(Object.assign({}, updatedItem), { [field]: e.target.value }))} required/>
                </div>))}
            </div>

            {/* action buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button onClick={() => setopened(false)} className="text-gray-600 hover:text-black transition">
                Cancel
              </button>
              <button onClick={() => handlesubmit2(activeId, updatedItem)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Update
              </button>
            </div>
          </div>
        </div>)}
    </div>);
}
