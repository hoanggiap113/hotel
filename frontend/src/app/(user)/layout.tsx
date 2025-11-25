"use client";
import Header from "./_components/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
          {children}
        {/* Footer tạm */}
        <footer className="border-t mt-10 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My Hotel@. All rights reserved.
        </footer>
    </>
  );
}
