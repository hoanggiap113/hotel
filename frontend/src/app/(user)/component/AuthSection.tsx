'use client';

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
                // Chưa đăng nhập
                <Link href="/login" className="hover:text-blue-600 transition">
                    Login
                </Link>
            )}
        </>
    );
}