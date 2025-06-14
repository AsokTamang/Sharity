import {create} from 'zustand'
import {persist} from 'zustand/middleware'   //this persist method of zustand middleware helps us to persist the data i.e save the  data in the local storage until we remove them manually.


interface msg{
    sender:{
        _id:string;
        email:string;
        contact:number
    };
    content:string;
}

interface chatStoreType {
    messages:msg[];
    message:string;
    Hydrated:boolean;
    setLastMessages:(msg:msg[])=>void;
    setHydrated:(arg0: boolean)=>void;
    setMessages:(msg:msg)=>void;
    setMessage:(msg:string)=>void;
    reset:()=>void;

}


export const chatStore=create<chatStoreType>()(persist((set)=>({
    messages:[],
    message:'',
    Hydrated:false
    ,
    setHydrated:(state)=>({Hydrated:state}),
    setLastMessages:(msg)=>set({messages:msg}),   //here for the last messages we directly input the msg inside the messages array
    setMessages:(msg)=>set((state)=>({messages:[...state.messages,msg]})),  //but for the new messages we keep on appending the new messages inside an array.
    setMessage:(msg)=>set({message:msg}),
    reset:()=>set({   //this reset function is for removing the datas between the loggein user session
        messages:[],
        message:'',
        Hydrated:false,  //we also set the hydrated into false when the user logs out
    })












}),{
    name:'chat-Storage',
    onRehydrateStorage:()=>(state)=> {
        state?.setHydrated(true);      //here we are checking if the state exists which means our zustand store retrieves the datas from the local storage completely then only we set the hydrated to true.
        
    },

        
    
}))