"use client";

import Link from "next/link";
import { useAppSelector } from "@/hooks/reduxHooks";
import UserDropdown from "./UserDropdown";

export default function AuthSection() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated && user ? (
        <UserDropdown user={user} />
      ) : (
        <Link href="/login">
          <span
            className="text-black font-semibold py-2 px-4 border-1 border-gray-400             
            rounded-xl transition duration-150 inline-block hover:bg-blue-100"
          >
            Login
          </span>
        </Link>
      )}
    </>
  );
}
