"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
export default function Signup() {

  const router = useRouter();
  const [item, setitem] = React.useState({id:"", name: "", description: "",image:"",condition:"" });
  const handlesubmit = async (e:FormEvent) => {
    e.preventDefault();
   
    try {
        
      const response = await axios.post("/api/additems", item);
      const { success, message,error,data } =await response.data; //here as we are using the axios we can only retrieve the data or anything returned by our backedn using the . data only
      console.log(data);
      if(success){
      toast.success(message);
      setTimeout(()=> router.push("/main"),1000 )}
      else{
        toast.error(message);
        console.log(error)

      }
     
     
    } catch (error:any) {
      toast.error(error.response.data.message);   
      console.log(error.response.data.message);
    }
  };


  return (
    <div>
    
    <form onSubmit={handlesubmit} className=" flex flex-col items-center">
         <div className="flex flex-col justify-start items-center max-w-[600px]">
        <label htmlFor="id" className="font-bold text-[18px] text-black uppercase">Id</label>
        <Input
        className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important w-full"
          id="id"
          name="id"
          value={item.id}
          onChange={(e) => setitem({ ...item, id: e.target.value })}
          placeholder="Enter an id"
          required
        />
      </div>
      <div className="flex flex-col justify-start items-center max-w-[600px]">
        <label htmlFor="name"  className="font-bold text-[18px] text-black uppercase">Name</label>
        <Input
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important w-full"
          id="name"
          name="name"
          value={item.name}
          onChange={(e) => setitem({ ...item, name: e.target.value })}
          placeholder="Enter a name"
          required
        />
      </div>
      <div className="flex flex-col justify-start items-center max-w-[600px]">
        <label htmlFor="description"  className="font-bold text-[18px] text-black uppercase">description</label>
        <Textarea
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important w-full"
          id="description"
          name="description"
          value={item.description}
          onChange={(e) => setitem({ ...item, description: e.target.value })}
          placeholder="Describe the feature of your item"
          required
        />
      </div>

      <div className="flex flex-col justify-start items-center max-w-[600px]">
        <label htmlFor="image"  className="font-bold text-[18px] text-black uppercase">image</label>
        <Input
           className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important w-full"
          id="image"
          name="image"
          value={item.image}
    
          onChange={(e) => setitem({ ...item, image: e.target.value })}
          placeholder="Enter your image url"
          required
        />
      </div>
      <div className="flex flex-col justify-start items-center max-w-[600px]">
        <label htmlFor="condition"  className="font-bold text-[18px] text-black uppercase">condition</label>
        <Input
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important w-full"
          id="condition"
          name="condition"
          value={item.condition}
          onChange={(e) => setitem({ ...item, condition: e.target.value })}
          placeholder="condition of your item"
          required
        />
      </div>

      <Button type="submit"  className="w-1/3 text-black hover:text-white hover:border-black  bg-amber-200 border-[4px] rounded-full p-5 min-h-[70px]  font-bold text-[18px] mt-4 !important" >Add Item</Button>
      </form>
      </div>
   
  );
}
