"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Form from 'next/form'
import { authStore } from "@/store/globalstate";
import Link from "next/link";
export default function Signup() {
  const{loggedin,setloggedin}=authStore();
  
  const router = useRouter();
  const [user, setuser] = React.useState({ email: "", password: "" });
  const handlesubmit = async () => {
   
    try {
        
      const response = await axios.post("/api/signin", user);
      const { success, message } =await response.data; //here as we are using the axios we can only retrieve the data or anything returned by our backedn using the . data only
      if(success){
        setloggedin(true)
      toast.success(message);
      setTimeout(()=> router.push("/main"),2000 )}
     
     
    } catch (error:any) {
      setloggedin(false)
      toast.error(error.response.data.message);   
      console.log(error.response.data.message);
    }
  };

  return (
    <main className="flex flex-col gap-2 items-center mt-32  justify-start">
    <Form action={handlesubmit} className=" w-96 p-8 hover:shadow-xl">
      <div className="flex justify-start items-center max-w-[600px]">
        <label htmlFor="email" className="p-2">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          placeholder="Enter an email"
          required
        />
      </div>
      <div className="flex justify-start items-center max-w-[600px]">
        <label htmlFor="password" className="p-2">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          placeholder="Enter a password"
          required
        />
      </div>

      <Button type="submit" className=" w-half" >Sign In</Button>
       <h2>Don't have an account?</h2>
       <span className="w-half bg-gray-900 hover:bg-gray-700 text-white p-1 rounded-[4px]">
      <Link href='/signup'>Sign up </Link>
      </span>
      </Form>

     
    </main>
  );
}
