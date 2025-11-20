"use client";
import { Poppins } from "next/font/google";
import Header from "./_components/Header";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className="min-h-screen flex flex-col">
        <Header />
          {children}
        {/* Footer tạm */}
        <footer className="border-t mt-10 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My Hotel@. All rights reserved.
        </footer>
      </body>
    </>
  );
}
