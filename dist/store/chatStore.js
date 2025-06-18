"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.chatStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    messages: [],
    message: '',
    Hydrated: false,
    setHydrated: (val) => set({ Hydrated: val }),
    setLastMessages: (msg) => set({ messages: msg }),
    setMessages: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    setMessage: (msg) => set({ message: msg }),
    reset: () => set({
        messages: [],
        message: '',
        Hydrated: false,
    }),
}), {
    name: 'chat-Storage',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage), //here we are creating a storage in the localStorage using createJSONStorage.
    partialize: (state) => ({
        messages: state.messages,
        message: state.message,
    }),
    onRehydrateStorage: (state) => () => {
        if (state) {
            state.setHydrated(true); //here we are checking if the state is retrieved from the localstorage by the zustand while displaying the ui.and if the state is ccompletely retrieved then we set the hydrated true.
        }
    }
}));
