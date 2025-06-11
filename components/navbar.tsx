"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";
import { authStore } from "@/store/globalstate";
export default function Navbar() {
 const {loggedin,setloggedin}=authStore();
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/check",{withCredentials:true});
        const { success } = await res.data;    //we must use res.data while using axios inorder to destructure the responsed returned by our backend server
        console.log('checking token',success);

        setloggedin(success);
        console.log('store loggedin',loggedin)
      } catch (error:any) {
        setloggedin(false);
        console.log(error.message)
      }
    })(); //then we call this asyn function
  }, []);

  const handlesubmit = async () => {
    try {
      const res = await axios.get("/api/signout",{withCredentials:true});
      const { success, message } = await res.data;
      console.log(success);

      if (success) {
        console.log(message);
        router.push("/");
        setloggedin(false);
      }
    } catch (error: any) {
      setloggedin(true);
      toast.error(error.message);
    }
  };
  return (
    <nav className="flex flex-row items-center justify-end gap-16 h-16 bg-amber-300 shadow-xl">
      <Link href={"/"}>Home</Link>
      <Link href={"/main"}>Main</Link>
      {!loggedin && <Link href={"/signup"}>SIGNUP</Link>}
      {!loggedin &&<Link href={"/signin"}>SIGNIN</Link>}

      {loggedin && <button onClick={handlesubmit}>SignOut</button>}
    </nav>
  );
}
