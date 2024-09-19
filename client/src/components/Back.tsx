import { ArrowLeft } from "lucide-react"
import Link from "next/link";
import React from 'react';

const BackButton = () => {

  return (
    <Link href="/">
    <button
      className="flex items-center space-x-2 text-orange-400 hover:text-orange-500 transition-all duration-300 group"
    >
      <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
      <span>Back</span>
    </button>
    </Link>
  );
};

export default BackButton;
