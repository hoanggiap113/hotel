"use client";

import { UserOutlined,HomeOutlined, AccountBookFilled, ContainerFilled } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: AccountBookFilled, path: "/admin/dashboard" },
    { label: "Người dùng", icon: UserOutlined, path: "/admin/users" },
    { label: "Phòng", icon: HomeOutlined, path: "/admin/rooms" },
    { label: "Đặt phòng", icon: ContainerFilled, path: "/admin/bookings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">ShoeMaker</h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map(({ label, icon: Icon, path }) => {
          const isActive = pathname === path;

          return (
            <Link
              key={label}
              href={path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <Icon className="text-2xl" />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
