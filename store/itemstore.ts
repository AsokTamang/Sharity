import axios from "axios";
import mongoose from "mongoose";
import { create } from "zustand";
import { userModal } from "@/models/usermodel";


interface User{
  _id:string;
  email:string;
  contact:number;
}


interface item {
  _id: mongoose.ObjectId;
  id: string;
  name: string;
  description: string;
  image: string;
  condition: string;
  user: {
    _id: mongoose.ObjectId;
    username: string;
    email: string;
    password: string;
    contact: number;
  };
}

interface itemstoreType {
  items: item[];
  userID: string;
  user:User|null;
  fetchItems: () => Promise<{
    success: boolean;
    user:User;
    userID?:string;

    message: string;
    data?: item[];
    status: number;
  }>;
  deleteItems: (id: mongoose.ObjectId) => Promise<{
    success: boolean;
    message: string;
    data?: item[];
    status: number;
  }>;
  updateItems: (

    id: mongoose.ObjectId,
    newData: any
  ) => Promise<{
    success: boolean;
    message: string;
    data?: item[];
    status: number;
  }>;
}

export const itemStore = create<itemstoreType>((set) => ({
  items: [],
  userID: "",
  user:null,
  fetchItems: async () => {
    try {
      const res = await axios.get("/api/fetchitems");
      const { success, data, message, userID,user } = res.data;
      if (success) {
        set(() => ({ items: data, userID: userID,user:{_id:user?._id.toString(),email:user?.email,contact:user?.contact} })); //here we are using ...data casue data is also an array of objects returned from our mongo db
        return {
          success: true,
          message,
          data,
          userID,
          user,
          status: 200,
        };
      } else {
        return { success: false, message: message,  user: { _id: "", email: "", contact: 0 },status: 500 };
      }
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message,  user: { _id: "", email: "", contact: 0 },status: 500 };
    }
  },

  deleteItems: async (ID: mongoose.ObjectId) => {
    try {
      const res = await axios.delete(`/api/deleteitems`, {
        data: { id: ID },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, data, message } =await res.data;
      if (success) {
        set((state) => ({
          items: state.items.filter((item) => item._id !== ID),
        }));
        return { success: true, message: message, data: data, status: 200 };
      } else {
        return { success: false, message: message, data: [], status: 500 };
      }
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message, data: [], status: 500 };
    }
  },
  updateItems: async (ID:mongoose.ObjectId, newData: any) => {
    try {
      const res = await axios.put(
        '/api/updateitems',
        { id: ID, updateditem: newData }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, data, message } =await res.data; //here we are using the res.data as axios's reponse is stored in data
      if (success) {
        set((state) => ({
          items: state.items.map((item) => (item._id.toString() === ID.toString() ? data : item)),
        }));
        return { success: true, message: message, data: data, status: 200 };
      } else {
        return { success: false, message: message, data: [], status: 500 };
      }
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message, data: [], status: 500 };
    }
  },
  
  
}));
