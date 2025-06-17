"use client";

import { itemStore } from "@/store/itemstore";

import Link from "next/link";
import Image from "next/image";

// Props passed from server to client
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
      className="bg-white shadow-lg rounded-xl w-full max-w-3xl mx-auto overflow-hidden p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl"
    >
      {/* check if it's user's own item */}
      <p className="text-sm text-gray-500 font-medium">
        {userID === data?.user?._id?.toString() ? "Your item" : "Other's item"}
      </p>

      {/* item image */}
      <Image
        src={image}
        alt="item-image"
        width={365}
        height={200}
        className="rounded-xl object-cover h-[200px] w-full"
        priority={false}
      />

      {/* item info */}
      <div className="flex flex-col gap-2 text-gray-800">
        <h2 className="text-xl font-bold">Item name: {name}</h2>

        <p className="text-sm">
          <span className="font-semibold">Description:</span> {description}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Condition:</span> {condition}
        </p>

        {/* show owner contact if logged-in user is not the owner */}
        {userID.toString() !== data?.user?._id.toString() && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border space-y-2">
            <h3 className="font-semibold text-sm">Owner Details</h3>
            <p className="text-sm">📧 Email: {email}</p>
            <p className="text-sm">📞 Contact: {contact}</p>

            <Link href={`/chat/${data?._id}`}>
              <p className="text-base font-semibold text-green-700 hover:underline hover:text-green-800">
                chat with the owner
              </p>
            </Link>
          
          </div>
        )}

        {/* when the logged in user is the owner of an item */}
        {userID === data?.user?._id.toString() && (
          <Link href={`/chatting/${data?._id}`}>
            <p className="text-base font-medium text-blue-600 hover:underline hover:text-blue-800">
              See your inbox
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
