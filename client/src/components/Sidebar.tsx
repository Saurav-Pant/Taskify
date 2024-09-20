"use client";
import React, { useState } from "react";
import {
  Home,
  Layout,
  Settings,
  Users,
  BarChart2,
  BookCheck,
  User2,
  LogOutIcon,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import useToken from "@/Hooks/useToken";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

const SidebarMenu = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const { userName: name, clearToken } = useToken();

  const LogOut = () => {
    clearToken();
    toast.success("Successfully logged out! Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="w-64 h-screen flex flex-col bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <div className="flex items-center">
              <BookCheck className="text-orange-500 sm:w-6 sm:h-6" />
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User2 size={22} className="text-orange-500 font-semibold" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <User2 className="mr-2 h-4 w-4" />
                <span>{name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true); 
                }}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <div></div>
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

        <nav className="flex-1 mt-3">
          <ul className="p-2">
            <Link href="/">
            <li className="px-2 py-2 text-[#797979] hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
              <Home size={18} className="mr-3" />
              Home
            </li>
            </Link>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default SidebarMenu;
