"use client";

import Image from "next/image";
export default function Header() {
  return (
    <>
      <div className=" h-[60px] bg-white w-full shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between px-8 h-full">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.svg"
                alt="Hotel Logo"
                fill
                priority
                className="invert"
              />
            </div>
            <span className="text-2xl font-bold">
                <span className="text-blue-600">Agen</span>
                <span className="text-black">da.</span>
            </span>
          </div>
          {/* Menu */}
          <nav className="flex flex-row items-center gap-6 text-gray-700 font-medium">
            <div className="cursor-pointer hover:text-blue-600 transition">
              About
            </div>
            <div className="cursor-pointer hover:text-blue-600 transition">
              Contact
            </div>
            <div className="cursor-pointer hover:text-blue-600 transition">
              Login
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
