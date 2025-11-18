"use client";
import { Poppins } from "next/font/google";
import Header from "./components/Header";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
          {children}
        </main>
      </div>
    </>
  );
}
