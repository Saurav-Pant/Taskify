"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "@/components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "@/components/Back";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${Backend_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      Cookies.set("token", data.token);
      Cookies.set("userId", JSON.stringify(data.user.id));
      Cookies.set("name", data.user.name);

      toast.success("Sign up successful! Redirecting...");
      setTimeout(() => router.push("/Dashboard"), 1500);
    } catch (err) {
      toast.error("Failed to sign up. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen ">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800">
            Join <span className="text-orange-400">YouseAI</span>
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                placeholder="Full name"
                className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-orange-300 to-orange-500 hover:bg-opacity-90 transition-all ease-in-out duration-300"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/Login">
              <span className="text-orange-500 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
