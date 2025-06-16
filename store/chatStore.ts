import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface msg {
  sender: {
    _id: string;
    email: string;
    contact: number;
  };
  content: string;
}

interface chatStoreType {
  messages: msg[];
  message: string;
  Hydrated: boolean;
  setLastMessages: (msg: msg[]) => void;
  setHydrated: (arg0: boolean) => void;
  setMessages: (msg: msg) => void;
  setMessage: (msg: string) => void;
  reset: () => void;
}

export const chatStore = create<chatStoreType>()(
  persist(
    (set) => ({
      messages: [],
      message: '',
      Hydrated: false,
      setHydrated: (state) => set({ Hydrated: state }),
      setLastMessages: (msg) => set({ messages: msg }),
      setMessages: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      setMessage: (msg) => set({ message: msg }),
      reset: () =>
        set({
          messages: [],
          message: '',
          Hydrated: false,
        }),
    }),
    {
      name: 'chat-Storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        message: state.message,
      }),
      onRehydrateStorage: (state) => () => {
        if(state){   //here we are checking if the zustand has retrieved the states from the localstorage completely or not.
        (state as chatStoreType).setHydrated(true);}
      },
    }
  )
);
