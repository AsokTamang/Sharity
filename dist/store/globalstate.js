"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authStore = void 0;
const zustand_1 = require("zustand");
exports.authStore = (0, zustand_1.create)((set) => ({
    loggedin: false,
    setloggedin: (status) => set({ loggedin: status }),
    opened: false,
    setopened: (status) => set({ opened: status }),
    updatedItem: { name: '', description: '', image: '', condition: '' },
    setupdatedItem: (state) => set({ updatedItem: state }),
    activeId: '',
    setactiveId: (id) => set({ activeId: id })
}));
