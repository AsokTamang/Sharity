import mongoose from 'mongoose';
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';


type authType={
    loggedin:boolean,
    opened:boolean,
    setloggedin:(status:boolean)=>void,//here void means it returns nothing
    setopened:(status:boolean)=>void,
    updatedItem:any;
    setupdatedItem:(state:any)=>void,
    activeId:any,
    setactiveId:(id:any)=>void,
    reset1:()=>void,


}

export const authStore=create<authType>()(persist((set)=>({
    loggedin:false,
    setloggedin:(status)=>set({loggedin:status}),
    opened:false,
    setopened:(status)=>set({opened:status}),
    updatedItem:{name:'',description:'',image:'',condition:''},
    setupdatedItem:(state)=>set({updatedItem:state}),
    activeId:'',
    setactiveId:(id)=>set({activeId:id}),
    reset1:()=>set({loggedin:false,
        opened:false,

    })
}


),{
    name:'global-storage',
    storage:createJSONStorage(()=>localStorage)
    ,
    partialize:(state)=>({
        loggedin:state.loggedin
    }
)


}))


