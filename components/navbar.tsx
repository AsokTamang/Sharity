"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";
import { authStore } from "@/store/globalstate";
import { chatStore } from "@/store/chatStore";
import { itemStore } from "@/store/itemstore";


export default function Navbar() {
  const { reset } = chatStore();
  const { loggedin, setloggedin,reset1 } = authStore();
  const {reset3}=itemStore();
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/check`, { withCredentials: true });
        const { success } = res.data;
        setloggedin(success);
      } catch (error: unknown) {
        if(error instanceof Error){
        setloggedin(false);
        console.error(error.message);}
      }
    })();
  }, [setloggedin]);

  const handleSignOut = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/signout`, { withCredentials: true });
      const { success } = res.data;

      if (success) {
        router.push("/");
        setloggedin(false);
        reset(); // Reset Zustand store
        reset1();
        reset3();

      }
    } catch (error: unknown) {
      if(error instanceof Error){
      setloggedin(true);
      toast.error(error.message);}
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-amber-500">
        <Link
          href="/"
          className="hover:text-amber-600 transition-colors duration-200"
        >Sharity</Link></div>
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <Link
          href="/"
          className="hover:text-amber-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/main"
          className="hover:text-amber-600 transition-colors duration-200"
        >
          Main
        </Link>

        {!loggedin && (
          <>
            <Link
              href="/signup"
              className="hover:text-amber-600 transition-colors duration-200"
            >
              Signup
            </Link>
            <Link
              href="/signin"
              className="hover:text-amber-600 transition-colors duration-200"
            >
              Signin
            </Link>
          </>
        )}

        {loggedin && (
          <button
            onClick={handleSignOut}
            className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
