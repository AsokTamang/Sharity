"use client";
import { itemStore } from "@/store/itemstore";
import { authStore } from "@/store/globalstate";
import React from "react";
import Image from "next/image";
import mongoose from "mongoose";
import {  Trash } from "@deemlol/next-icons";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SearchItem from "@/components/searchItem";


interface itemProps{
  name:string;
  image:string;
  condition:string;
  description:string;

}

// define the shape of each item
interface populatedItem {
  _id: mongoose.ObjectId;
  id: string;
  name: string;
  description: string;
  condition: string;
  image: string;
  user?: {
    _id?: mongoose.ObjectId;
    username?: string;
    email?: string;
    contact?: number;
  };
}

export default function Fetching() {
  const { items, fetchItems, deleteItems, userID, updateItems } = itemStore();
  const {
    opened,
    setopened,
    updatedItem,
    setupdatedItem,
    activeId,
    setactiveId,
  } = authStore();

  // fetching all items once component mounts
  React.useEffect(() => {
    fetchItems();
  },[fetchItems] );

  // delete an item
  const handlesubmit = async (id: mongoose.ObjectId) => {
    const { success, message } = await deleteItems(id);
    try {
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: unknown) {
      if(error instanceof Error){
      toast.error(error.message);}
    }
  };

  // update an item
  const handlesubmit2 = async (id: mongoose.ObjectId, newData: itemProps) => {
    const { success, message } = await updateItems(id, newData);
    try {
      if (success) {
        toast.success(message);
        setopened(false);
        setactiveId("");
        setupdatedItem({
          name: "",
          image: "",
          description: "",
          condition: "",
        });
        fetchItems();
      } else {
        toast.error(message);
      }
    } catch (error: unknown) {
      if(error instanceof Error){
      toast.error(error.message);}
    }
  };

  // loop through each item to display
  const elements = (items as populatedItem[])?.map((item, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col gap-3 transition duration-300 hover:shadow-2xl"
    >
      <Link href={`/seeitems/${item._id}`} className="hover:text-green-500">
        Visit this page
      </Link>

      <p className="text-sm text-gray-500 font-medium">
        {userID === item?.user?._id?.toString() ? "Your item" : "Other's item"}
      </p>

      <img
        src={item.image!}
        alt="item-image"
        width={365}
        height={200}
        className="rounded-xl object-cover h-[200px] w-full"
      />

      <div className="flex flex-col gap-1 text-gray-800">
        <h2 className="text-lg font-bold">Item name: {item?.name}</h2>
        <p className="text-sm">
          <span className="font-semibold">Description:</span>{" "}
          {item?.description}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Condition:</span> {item?.condition}
        </p>

        {userID !== item?.user?._id?.toString() && (
          <div className="mt-3 bg-gray-50 p-3 rounded-md border">
            <h3 className="font-semibold text-sm">Owner Details</h3>
            <p className="text-sm">📧 Email: {item?.user?.email}</p>
            <p className="text-sm">📞 Contact: {item?.user?.contact}</p>
          </div>
        )}

        <div className="mt-4 flex gap-4">
          {userID === item?.user?._id?.toString() && (
            <>
              {/* delete button */}
              <button
                onClick={() => handlesubmit(item._id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Delete Item"
              >
                <Trash size={24} />
              </button>

              {/* edit button */}
              <button
                onClick={() => {
                  setupdatedItem({
                    name: item.name,
                    description: item.description,
                    image: item.image,
                    condition: item.condition,
                  });
                  setopened(true);
                  setactiveId(item._id.toString());
                }}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {/* search component */}
      <SearchItem />

      {/* grid view for items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full max-w-[1400px]">
        {elements}
      </div>

      {/* popup for editing items */}
      {opened && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-center">Update Item</h2>

            {/* input fields */}
            <div className="space-y-3">
              {["name", "description", "image", "condition"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="block text-sm font-medium capitalize text-gray-700">
                    {field}:
                  </label>
                  <Input
                    name={field}
                    type="text"
                    value={updatedItem?.[field as keyof typeof updatedItem]}
                    onChange={(e) =>
                      setupdatedItem({
                        ...updatedItem,
                        [field]: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              ))}
            </div>

            {/* action buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setopened(false)}
                className="text-gray-600 hover:text-black transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handlesubmit2(activeId, updatedItem)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
