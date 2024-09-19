"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import Spinner from "@/components/LoadingSpinner";
import BackButton from "@/components/Back"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      toast.info(
        "Please wait, the backend is hosted on Render so it may take time to execute due to lower CPU performance.",
        { autoClose: 5000 } 
      );
    }
  }, [isLoading]);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); 

    const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    try {
      const response = await fetch(`${Backend_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      Cookies.set('token', data.token);
      Cookies.set('userId', JSON.stringify(data.user.id));
      Cookies.set('name', data.user.name);

      toast.success('Login successful! Redirecting...');
      setTimeout(() => router.push('/Dashboard'), 1500);  
    } catch (err) {
      toast.error('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="h-screen">
      <div className="absolute top-4 left-4">
        <BackButton /> 
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Welcome to <span className="text-orange-400">YouseAI!</span>
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-[10px]">
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full py-3 px-4 border rounded-lg bg-[#EBEBEB]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-[10px]">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full py-3 px-4 border rounded-lg bg-[#EBEBEB]"
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
              {isLoading ? <Spinner /> : 'Login'} 
            </button>
          </form>
          <p className="mt-4 text-center text-gray-500">
            Don't have an account? Create a 
            <Link href="/Signup">
              <span className="text-orange-500 cursor-pointer pl-2 hover:underline">
                new account
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
