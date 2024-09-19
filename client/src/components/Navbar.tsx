"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut, BookCheck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import useToken from "@/Hooks/useToken";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Navbar = () => {
  const { token, clearToken } = useToken();
  const [open, setOpen] = useState(false);

  const Logout = () => {
    clearToken();
    toast.success("Successfully logged out! Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

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
            <div>
              <div className="flex justify-between items-center">
                <Link href="/Dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center group rounded-lg text-sm sm:text-sm m-2 px-4"
                  >
                    Dashboard
                  </Button>
                </Link>

                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 sm:gap-2 group rounded-lg text-xs sm:text-sm"
                    >
                      Logout
                      <LogOut
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4"
                      />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <h3>Are you sure?</h3>
                      <p>Do you really want to log out?</p>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => {
                          Logout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </div>
      <Separator className="mt-2" />
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
