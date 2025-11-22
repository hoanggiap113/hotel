"use client";
import Image from "next/image";
import Link from "next/link";
import AuthSection from "./AuthSection";
export default function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Room", href: "/buildings" },
    { name: "About", href: "/" }, 
    { name: "Contact", href: "/" },
  ];
  return (
    <>
      <div className=" h-[60px] bg-white w-full shadow-sm">
        <div className="flex flex-row items-center justify-between px-10 h-full">
          <div className="flex items-center space-x-2">
            <Link 
              href="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
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
            </Link>
          </div>
          {/* Menu */}
          <nav className="flex justify-end items-center gap-6 font-medium ">
            {/* Menu chính */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black hover:text-blue-600 transition"
              >
                {item.name}
              </Link>
            ))}

            {/* Phần xử lý Auth & Dropdown */}
            <AuthSection />
          </nav>
        </div>
      </div>
    </>
  );
}
