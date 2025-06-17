"use client";

import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const [item, setItem] = React.useState({
    id: "",
    name: "",
    description: "",
    image: "",
    condition: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/additems", item);
      const { success, message, error } = res.data;
      if (success) {
        toast.success(message);
        setTimeout(() => router.push("/main"), 1000);
      } else {
        toast.error(message);
        console.log(error);
      }
    } catch (error: unknown ) {
      if(error instanceof Error){
      toast.error(error.message || "Submission failed");}
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-10 px-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-amber-700">
          Add an Item for Sharing
        </h1>

        {/** ID */}
        <div>
          <label htmlFor="id" className="block font-medium mb-1">
            Item ID
          </label>
          <Input
            id="id"
            name="id"
            value={item.id}
            onChange={(e) => setItem({ ...item, id: e.target.value })}
            placeholder="Unique item identifier"
            required
          />
        </div>

        
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Item Name
          </label>
          <Input
            id="name"
            name="name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder="What’s the name of your item?"
            required
          />
        </div>

        {/** Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={item.description}
            onChange={(e) =>
              setItem({ ...item, description: e.target.value })
            }
            placeholder="Describe the features of your item"
            required
          />
        </div>

        {/** Image */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Image URL
          </label>
          <Input
            id="image"
            name="image"
            value={item.image}
            onChange={(e) => setItem({ ...item, image: e.target.value })}
            placeholder="Paste a direct image URL"
            required
          />
        </div>

      
        <div>
          <label htmlFor="condition" className="block font-medium mb-1">
            Condition
          </label>
          <Input
            id="condition"
            name="condition"
            value={item.condition}
            onChange={(e) => setItem({ ...item, condition: e.target.value })}
            placeholder="e.g., New, Gently used, Needs repair"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-amber-300 hover:bg-amber-400 text-black font-semibold py-3 rounded-xl shadow-md transition"
        >
          Add Item
        </Button>
      </form>
    </div>
  );
}
