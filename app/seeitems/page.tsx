"use client";
import { itemStore } from "@/store/itemstore";
import { authStore } from "@/store/globalstate";
import React from "react";
import Image from "next/image";
import mongoose from "mongoose";
import { Key, Trash } from "@deemlol/next-icons";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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

  React.useEffect(() => {
    fetchItems();
  }, []);

  const handlesubmit = async (id: mongoose.ObjectId) => {
    const { success, message } = await deleteItems(id);
    try {
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlesubmit2 = async (id: mongoose.ObjectId, newData: any) => {
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
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const elements = (items as populatedItem[])?.map((item, index) => (
 
    
    <div
      className="bg-white shadow-lg rounded-xl overflow-hidden p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl"
      key={index}
    >
      <Link href={`/seeitems/${item._id}`} className="hover:text-green-500" key={index}>
      Visit this page </Link>
      <p className="text-sm text-gray-500 font-medium">
        {userID === item?.user?._id?.toString() ? "Your item" : "Other's item"}
      </p>

      <Image
        src={item.image!}
        alt="item-image"
        width={365}
        height={200}
        className="rounded-xl object-cover h-[200px] w-full"
        priority={false}
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
              <button
                onClick={() => handlesubmit(item._id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Delete Item"
              >
                <Trash size={24} />
              </button>
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {elements}
      </div>

      {opened && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-center">Update Item</h2>
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
    </>
  );
}
