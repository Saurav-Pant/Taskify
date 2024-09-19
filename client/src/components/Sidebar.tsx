"use client";
import React, { useState } from "react";
import { Sun, Home, Layout, Settings, Users, BarChart2 } from "lucide-react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const SidebarMenu = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const name = Cookies.get("name");

  const LogOut = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("email");

    toast.success("Successfully logged out! Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="w-64 h-screen flex flex-col bg-white">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User2 size={22} className="text-orange-500 font-semibold" />
          </div>
          <span className="font-semibold text-gray-700">{name}</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center justify-between space-x-4">
            <Sun size={22} />
          </div>
          <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <button className="bg-[#F4F4F4] text-orange-500 py-1 px-2 rounded-md transition duration-200">
                  Logout
                </button>
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
                      LogOut();
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
      </div>
      <nav className="flex-1">
        <ul className="p-2">
          <li className="px-2 py-2 text-[#797979] hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
            <Home size={18} className="mr-3" />
            Home
          </li>
          <li className="px-2 py-2 text-[#797979] hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
            <Layout size={18} className="mr-3" />
            Boards
          </li>
          <li className="px-2 py-2 text-[#797979] hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
            <Settings size={18} className="mr-3" />
            Settings
          </li>
          <li className="px-2 py-2 text-[#797979] hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
            <Users size={18} className="mr-3" />
            Teams
          </li>
          <li className="px-2 py-2 text-[#797979] hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
            <BarChart2 size={18} className="mr-3" />
            Analytics
          </li>
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default SidebarMenu;
