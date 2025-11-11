"use client";
import { Poppins } from "next/font/google";
import Header from "./component/Header";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
          <Header />

          {children}
        </main>

        {/* Footer tạm */}
        <footer className="border-t mt-10 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My Hotel@. All rights reserved.
        </footer>
      </body>
    </>
  );
}
