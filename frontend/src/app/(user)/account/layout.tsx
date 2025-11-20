"use client";
import { Poppins } from "next/font/google";
import Header from "../component/Header";
import AccountSidebar from "./components/Sidebar";
import UserAuthGuard from "./components/AuthGuard";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#EFF4FC] min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:px-8">
        <aside className="w-full md:w-auto md:flex-none">
          <AccountSidebar />
        </aside>

        <div className="w-full md:flex-1">
          <UserAuthGuard>{children}</UserAuthGuard>
        </div>
      </div>
    </main>
  );
}
