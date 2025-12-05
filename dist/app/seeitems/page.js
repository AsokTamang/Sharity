"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fetching;
const jsx_runtime_1 = require("react/jsx-runtime");
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
        return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col gap-3 transition duration-300 hover:shadow-2xl", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: `/seeitems/${item._id}`, className: "hover:text-green-500", children: "Visit this page" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 font-medium", children: userID === ((_b = (_a = item === null || item === void 0 ? void 0 : item.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) ? "Your item" : "Other's item" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: item.image, alt: "item-image", width: 365, height: 200, className: "rounded-xl object-cover h-[200px] w-full", priority: false }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 text-gray-800", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "text-lg font-bold", children: ["Item name: ", item === null || item === void 0 ? void 0 : item.name] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Description:" }), " ", item === null || item === void 0 ? void 0 : item.description] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Condition:" }), " ", item === null || item === void 0 ? void 0 : item.condition] }), userID !== ((_d = (_c = item === null || item === void 0 ? void 0 : item.user) === null || _c === void 0 ? void 0 : _c._id) === null || _d === void 0 ? void 0 : _d.toString()) && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 bg-gray-50 p-3 rounded-md border", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-sm", children: "Owner Details" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: ["\uD83D\uDCE7 Email: ", (_e = item === null || item === void 0 ? void 0 : item.user) === null || _e === void 0 ? void 0 : _e.email] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: ["\uD83D\uDCDE Contact: ", (_f = item === null || item === void 0 ? void 0 : item.user) === null || _f === void 0 ? void 0 : _f.contact] })] })), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 flex gap-4", children: userID === ((_h = (_g = item === null || item === void 0 ? void 0 : item.user) === null || _g === void 0 ? void 0 : _g._id) === null || _h === void 0 ? void 0 : _h.toString()) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => handlesubmit(item._id), className: "text-red-600 hover:text-red-800 transition", title: "Delete Item", children: (0, jsx_runtime_1.jsx)(next_icons_1.Trash, { size: 24 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                            setupdatedItem({
                                                name: item.name,
                                                description: item.description,
                                                image: item.image,
                                                condition: item.condition,
                                            });
                                            setopened(true);
                                            setactiveId(item._id.toString());
                                        }, className: "text-blue-600 hover:text-blue-800 font-semibold text-sm", children: "Edit" })] })) })] })] }, index));
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center px-4", children: [(0, jsx_runtime_1.jsx)(searchItem_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full max-w-[1400px]", children: elements }), opened && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-center", children: "Update Item" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: ["name", "description", "image", "condition"].map((field) => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("label", { className: "block text-sm font-medium capitalize text-gray-700", children: [field, ":"] }), (0, jsx_runtime_1.jsx)(input_1.Input, { name: field, type: "text", value: updatedItem === null || updatedItem === void 0 ? void 0 : updatedItem[field], onChange: (e) => setupdatedItem(Object.assign(Object.assign({}, updatedItem), { [field]: e.target.value })), required: true })] }, field))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-4 pt-4", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setopened(false), className: "text-gray-600 hover:text-black transition", children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handlesubmit2(activeId, updatedItem), className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition", children: "Update" })] })] }) }))] }));
}
