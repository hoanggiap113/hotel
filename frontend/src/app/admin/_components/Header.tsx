"use client";
import { SettingOutlined, BellFilled, LogoutOutlined } from "@ant-design/icons";
import { logOut } from "@/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { User } from "@/types/user.type";
import api from "@/lib/util/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { message } from "antd";
export default function Header(){
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSignOut = async() => {
      setLoading(true);
      try{
        await api.post('/logout')
        dispatch(logOut());
        router.push('/login')
        message.success("Đã đăng xuất")
      }catch(error){
        console.log("Error",error);
        message.error('Đăng xuất thất bại. Vui lòng thử lại.');
      }finally{
        setLoading(false);
      }
    
  }
    const user: User = useAppSelector((state) => state.auth.user)!;
    if(!user){
      return null;
    }
    return (
    <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
      {/* Greeting */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Hello, {user.name}👋</h2>
        <p className="text-sm text-gray-500">Have a nice day</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button
          className="relative text-gray-500 hover:text-yellow-500 transition-colors"
          aria-label="Notifications"
        >
          <BellFilled className="text-2xl" />
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          className="text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Settings"
        >
          <SettingOutlined className="text-2xl " />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          className="text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Logout"
          onClick={handleSignOut}
          disabled={loading}
        >
          <LogoutOutlined className="text-2xl" spin={loading}/>
        </button>
      </div>
    </header>
  );
}