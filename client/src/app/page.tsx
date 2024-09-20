"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import Preview from "../../Assets/Preview.png";
import ShimmerButton from "@/components/ui/shimmer-button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useToken from "@/Hooks/useToken";
import { ToolTip } from "@/components/Tooltip";

const Hero = () => {
  const { token } = useToken();
  const router = useRouter();

  if (!token) {
    router.push("/");
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 my-24 ">
        <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-6xl font-bold mb-4 sm:mb-5 text-center mt-4 lg:leading-[1.2] leading-[1.1]">
          Manage Your Tasks Efficiently with
          <span className="text-orange-500 block sm:inline sm:ml-3 my-2">
            Taskify
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg mb-6 font-normal text-center max-w-xl">
          Taskify lets you easily manage your tasks and drag and drop them
          between statuses. Stay organized and get things done.
        </p>
        {/* {!token ? (
          <Link href="/Signup">
            <ShimmerButton>Get Started</ShimmerButton>
          </Link>
        ) : (
          <Link href="/Dashboard">
            <ShimmerButton>Dashboard</ShimmerButton>
          </Link>
        )} */}

        <div className="flex flex-col items-center">
          <ToolTip />
          <p className="text-gray-500">Trusted by 100+ Folks</p>
        </div>
        <div className="relative rounded-xl mx-2 mt-20 overflow-hidden">
          <Image
            src={Preview}
            alt="Preview"
            width={1015}
            className="border rounded-xl"
          />
          <BorderBeam size={250} duration={12} delay={0} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hero;
