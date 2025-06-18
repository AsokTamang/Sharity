"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    contact: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/api/signup`, user,{withCredentials:true});   //here as we are using the axios we can only retrieve the data or anything returned by our backedn using the . data only
     
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setTimeout(() => router.push("/signin"), 100);
      } else {
        toast.error(message || "Signup failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Create an Account
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              required
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter a secure password"
              required
              className="w-full"
            />
          </div>

          {/* Contact */}
          <div>
            <label
              htmlFor="contact"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Number
            </label>
            <Input
              type="tel"
              id="contact"
              name="contact"
              value={user.contact}
              onChange={(e) => setUser({ ...user, contact: e.target.value })}
              placeholder="Enter your contact number"
              required
              className="w-full"
              pattern="[0-9+]{7,15}"
              title="Please enter a valid contact number"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </main>
  );
}
