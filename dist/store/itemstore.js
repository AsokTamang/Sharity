"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemStore = void 0;
const axios_1 = __importDefault(require("axios"));
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.itemStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    items: [],
    selectedBuyer: "",
    setSelectedBuyer: (val) => set({ selectedBuyer: val }),
    userID: "",
    user: null,
    Hydrated: false,
    setHydrated: (val) => set({ Hydrated: val }),
    fetchItems: async () => {
        try {
            const res = await axios_1.default.get(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchitems`);
            const { success, data, message, userID, user } = res.data;
            if (success) {
                set(() => ({
                    items: data,
                    userID: userID,
                    user: {
                        _id: user === null || user === void 0 ? void 0 : user._id.toString(),
                        email: user === null || user === void 0 ? void 0 : user.email,
                        contact: user === null || user === void 0 ? void 0 : user.contact,
                    },
                })); //here we are using ...data casue data is also an array of objects returned from our mongo db
                return {
                    success: true,
                    message,
                    data,
                    userID,
                    user,
                    status: 200,
                };
            }
            else {
                return {
                    success: false,
                    message: message,
                    user: { _id: "", email: "", contact: 0 },
                    status: 500,
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
                user: { _id: "", email: "", contact: 0 },
                status: 500,
            };
        }
    },
    deleteItems: async (ID) => {
        try {
            const res = await axios_1.default.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteitems`, {
                data: { id: ID },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const { success, data, message } = await res.data;
            if (success) {
                set((state) => ({
                    items: state.items.filter((item) => item._id !== ID),
                }));
                return { success: true, message: message, data: data, status: 200 };
            }
            else {
                return { success: false, message: message, data: [], status: 500 };
            }
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
                data: [],
                status: 500,
            };
        }
    },
    updateItems: async (ID, newData) => {
        try {
            const res = await axios_1.default.put(`${process.env.NEXT_PUBLIC_API_URL}/api/updateitems`, { id: ID, updateditem: newData }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const { success, data, message } = await res.data; //here we are using the res.data as axios's reponse is stored in data
            if (success) {
                set((state) => ({
                    items: state.items.map((item) => item._id.toString() === ID.toString() ? data : item),
                }));
                return { success: true, message: message, data: data, status: 200 };
            }
            else {
                return { success: false, message: message, data: [], status: 500 };
            }
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
                data: [],
                status: 500,
            };
        }
    },
}), {
    name: "item-Storage",
    storage: (0, middleware_1.createJSONStorage)(() => localStorage), //here we are saving our userid and user info from here in our local storage called item-Storage.
    partialize: (state) => ({
        //after setting the storage name and storage we must partialize the datas that we need to save in our storage
        userID: state.userID,
        user: state.user,
        selectedBuyer: state.selectedBuyer,
    }),
    onRehydrateStorage: (state) => () => {
        if (state) {
            state.setHydrated(true);
        }
    },
}));
