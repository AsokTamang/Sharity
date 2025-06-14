"use client";

import { itemStore } from "@/store/itemstore";
import { userModal } from "@/models/usermodel";
import { itemModal } from "@/models/itemmodel";
import Link from "next/link";


import Image from "next/image";

interface itemprops {
  data: {
    _id: string;
    id: string;
    name: string;
    description: string;
    image: string;
    condition: string;
    user: {
      _id: string;
      email: string;
      contact: number;
    };
  };
}

export default function Client({ data }: itemprops) {
  const {
    name,
    image,
    description,
    condition,
    user: { email, contact },
  } = data;
  const { userID } = itemStore(); //as zustand's itemstore is a clientside store so we must use it within the client component

  return (
     <div
      className="bg-white shadow-lg rounded-xl w-[60%] h-[100%] overflow-hidden p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl"
     
    >
         <p className="text-sm text-gray-500 font-medium">
        {userID === data?.user?._id?.toString() ? "Your item" : "Other's item"}
      </p>
      <Image
        src={image}
        alt="item-image"
         width={365}
        height={200}
        className="rounded-xl object-cover h-[200px] w-full"
        priority={false}
      />

      <div className="flex flex-col gap-1 text-gray-800">
        <h2 className="text-lg font-bold">Item name: {name}</h2>
        <p className="text-sm">
          <span className="font-semibold">Description:</span> {description}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Condition:</span> {condition}
        </p>

        

        {userID.toString() !== data?.user?._id.toString() && (
          
          <div className="mt-3 bg-gray-50 p-3 rounded-md border">
            <h3 className="font-semibold text-sm">Owner Details</h3>
            <p className="text-sm">📧 Email: {email}</p>
            <p className="text-sm">📞 Contact: {contact}</p>
          <Link href={`/chat/${data?._id}`}>   
          <p className="text-xl font-bold font-serif hover:text-green-700">
        chat with the owner
        </p>
        </Link>
        
          </div>
        


        )}


        {userID===data?.user?._id.toString()&&  <Link href={`/chatting/${data?._id}`}>   {/*when the logged in user is the owner of an item*/}
        <p>See your inbox</p>
        </Link>}



       
        
       
      </div>
    </div>
  );
}
