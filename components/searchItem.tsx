"use client";

import React from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchItem() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    try {
      const res = await axios.get(`/api/fetchbyname?itemName=${query}`); //we are passing the query as a url in the backend api
      const { data } = res.data;
      if (!data) {alert("No items found")
        return;    //we must return if no data is found otherwise the bug will arise
      };

      router.push(`/seeitems/${data}`);   //then we use that _id returned which is in the string format 
    } catch (error: unknown) {
      if(error instanceof Error){
      alert(error.message);} 
    }
  };

  const reset = () => {
    const form = document.querySelector<HTMLFormElement>(".search-form"); //we must give the  type to form
    if (form) form.reset();
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      <h1 className="text-3xl font-light font-serif">Search Item</h1>

      <form onSubmit={handleSubmit} className="search-form w-full max-w-md">
        <div className="flex flex-row gap-2">
          <Input
            name="query"
            placeholder="Enter item name..."
            className="flex-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <Button
              onClick={reset}
              type="button"
              variant="outline"
              className="px-2"
              title="Reset"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          <Button type="submit" className="px-3" title="Search">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
