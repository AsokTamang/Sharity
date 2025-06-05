"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Form from 'next/form'
export default function Signup() {

  const router = useRouter();
  const [user, setuser] = React.useState({username:"", email: "", password: "",contact:"" });
  const handlesubmit = async () => {
   
    try {
        
      const response = await axios.post("/api/signup", user);
      const { success, message } =await response.data; //here as we are using the axios we can only retrieve the data or anything returned by our backedn using the . data only
      if(success){
      toast.success(message);
      setTimeout(()=> router.push("/signin"),1000 )}
     
     
    } catch (error:any) {
      toast.error(error.response.data.message);   
      console.log(error.response.data.message);
    }
  };

  return (
    <main className="flex flex-col gap-2 items-center mt-32  justify-start">
    <Form action={handlesubmit} className=" w-96 p-8 hover:shadow-xl">
         <div className="flex justify-start items-center max-w-[600px]">
        <label htmlFor="username" className="p-2">Username</label>
        <Input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
          placeholder="Enter a username"
          required
        />
      </div>
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
        <div className="flex justify-start items-center max-w-[600px]">
        <label htmlFor="contact" className="p-2">Contact</label>
        <Input
          type="number"
          id="contact"
          name="contact"
          value={user.contact}
          onChange={(e) => setuser({ ...user, contact: e.target.value })}
          placeholder="Contact detail"
          required
        />
      </div>

      <Button type="submit" className=" w-half" >Sign Up</Button>
      </Form>
    </main>
  );
}
