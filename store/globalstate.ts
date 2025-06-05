import mongoose from 'mongoose';
import {create} from 'zustand'


type authType={
    loggedin:boolean,
    opened:boolean,
    setloggedin:(status:boolean)=>void,//here void means it returns nothing
    setopened:(status:boolean)=>void,
    updatedItem:any;
    setupdatedItem:(state:any)=>void,
    activeId:any,
    setactiveId:(id:any)=>void,


}

export const authStore=create<authType>((set)=>({
    loggedin:false,
    setloggedin:(status)=>set({loggedin:status}),
    opened:false,
    setopened:(status)=>set({opened:status}),
    updatedItem:{name:'',description:'',image:'',condition:''},
    setupdatedItem:(state)=>set({updatedItem:state}),
    activeId:'',
    setactiveId:(id)=>set({activeId:id})
}))


