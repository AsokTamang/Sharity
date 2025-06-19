"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.authStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    loggedin: false,
    setloggedin: (status) => set({ loggedin: status }),
    opened: false,
    setopened: (status) => set({ opened: status }),
    updatedItem: { name: '', description: '', image: '', condition: '' },
    setupdatedItem: (state) => set({ updatedItem: state }),
    activeId: '',
    setactiveId: (id) => set({ activeId: id }),
    reset1: () => set({ loggedin: false,
        opened: false,
    })
}), {
    name: 'global-storage',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
    partialize: (state) => ({
        loggedin: state.loggedin
    })
}));
