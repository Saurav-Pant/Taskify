"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut, BookCheck } from "lucide-react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Logout = () => {
  Cookies.remove("token");
  Cookies.remove("userId");
  Cookies.remove("email");

  toast.success("Successfully logged out! Redirecting...");
  setTimeout(() => {
    window.location.href = "/";
  }, 1500);
};

const Navbar = () => {
  const token = Cookies.get("token");
  return (
    <nav className="px-2 sm:px-8 md:px-12 lg:px-20 py-2">
      <div className="flex items-center justify-between px-2 sm:px-6">
        <Link href="/">
          <div className="flex items-center">
            <BookCheck size={24} className="text-orange-500 sm:w-10 sm:h-10" />
            <span className="ml-1 sm:ml-2 text-sm sm:text-xl font-semibold">
              Taskify
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {!token ? (
            <Link href="/Signup">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 sm:gap-2 group rounded-lg text-xs sm:text-sm"
              >
                <Image
                  src="https://www.google.com/favicon.ico"
                  alt="Google Logo"
                  width={12}
                  height={12}
                  className="sm:w-4 sm:h-4"
                />
                Get Started
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4"
                />
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 group rounded-lg text-xs sm:text-sm"
              onClick={Logout}
            >
              Logout
              <LogOut
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4"
              />
            </Button>
          )}
        </div>
      </div>
      <Separator className="mt-2" />
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
