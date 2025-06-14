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
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
    try {
      const res = await axios.get(`/api/fetchbyname?itemName=${query}`); //we are passing the query as a url in the backend api
      const { data } = await res.data;
      if (!data) alert("No items found");
   
      router.push(`/seeitems/${data}`);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const reset = () => {
    const form = document.querySelector<HTMLFormElement>(".search-form"); //we must give the  type to form
    if (form) form.reset();
  };

  return (
    <div className="flex flex-col items-center ">
    <h1 className="text-3xl font-extralight mt-3.5 font-serif">Search Item</h1>
    
      <form onSubmit={handleSubmit} className="search-form w-96">
        <div className="flex flex-row gap-1.5">
        <Input
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <Button onClick={reset}>
            <X />
          </Button>
        )}
        <Button type="submit">
          <Search />
        </Button>
        </div>
      </form>
      </div>
    
  );
}
