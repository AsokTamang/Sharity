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
  setHydrated: (val: boolean) => void;
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
      setHydrated: (val) => set({ Hydrated: val }),
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
     storage:createJSONStorage(()=>localStorage),  //here we are creating a storage in the localStorage using createJSONStorage.
      partialize: (state) => ({
        messages: state.messages,
        message: state.message,
      }),
      onRehydrateStorage:(state)=>()=>{
        if(state){
          state.setHydrated(true);    //here we are checking if the state is retrieved from the localstorage by the zustand while displaying the ui.and if the state is ccompletely retrieved then we set the hydrated true.

        }
      }
      
    
    }
  )
);
