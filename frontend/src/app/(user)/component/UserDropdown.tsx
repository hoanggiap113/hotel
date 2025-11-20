// components/UserDropdown.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logOut } from "@/store/slices/auth.slice";
import { User } from "@/types/user.type"; 

interface UserDropdownProps {
    user: User;
}

const menuItems = [
    { name: "Đơn phòng", href: "/account/bookings" },
    { name: "Profile", href: "/account/profile" },
];

export default function UserDropdown({ user }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logOut());
        setIsOpen(false); 
        router.push('/');
    };

    return (
        <div className="relative">
            {/* Nút/Vùng kích hoạt Dropdown */}
            <div
                className="flex flex-col items-end p-2 cursor-pointer hover:bg-gray-100 rounded transition"
                onClick={() => setIsOpen(!isOpen)} 
            >
                <span className="font-semibold text-gray-800 text-base">{user.name || "Người dùng"}</span>
                <span className="text-gray-500 text-xs">{user.email}</span>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <div className="py-1">
                        {menuItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href} 
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                        
                        {/* Đăng xuất */}
                        <div 
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-50 transition border-t border-gray-100 mt-1 pt-1"
                        >
                            Đăng xuất
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}