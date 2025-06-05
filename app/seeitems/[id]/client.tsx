
"use client"

import { itemStore } from "@/store/itemstore";

import Image from "next/image";

export default async function Client(data:any ) {

  const { userID } = itemStore();   //as zustand's itemstore is a clientside store so we must use it within the client component
 

 
  return (
    <div>
      <Image
        src={data.image}
        alt="item-image"
        width={365}
        height={200}
        className="rounded-xl object-cover h-[200px] w-full"
        
       
      />

      <div className="flex flex-col gap-1 text-gray-800">
        <h2 className="text-lg font-bold">Item name: {data.name}</h2>
        <p className="text-sm">
          <span className="font-semibold">Description:</span> {data.description}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Condition:</span> {data.condition}
        </p>

        {userID.toString() !== data?.user?._id && (
          <div className="mt-3 bg-gray-50 p-3 rounded-md border">
            <h3 className="font-semibold text-sm">Owner Details</h3>
            <p className="text-sm">📧 Email: {data?.user?.email}</p>
            <p className="text-sm">📞 Contact: {data?.user?.contact}</p>
          </div>
        )}
      </div>
    </div>
  );
}
