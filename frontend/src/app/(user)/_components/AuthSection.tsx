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
            className="bg-blue-500 text-white font-semibold py-2 px-4              
            rounded-xl transition duration-150 inline-block hover:bg-blue-600"
          >
            Login
          </span>
        </Link>
      )}
    </>
  );
}
