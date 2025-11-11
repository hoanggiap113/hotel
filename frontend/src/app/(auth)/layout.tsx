import React from 'react';
import Link from 'next/link';


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-[Poppins] flex justify-center items-center min-h-screen bg-[#f0f2f5] p-4">
      <div className="flex w-[900px] max-w-full h-[600px] max-h-full bg-white rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden flex-col md:flex-row">
        
        <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto.format&fit=crop')] bg-cover bg-center items-center justify-center relative hidden md:flex">
          <div className="bg-white/65 backdrop-blur-md rounded-xl text-center px-8 py-10">
            <Link
              href="/"
              className="text-[2.2rem] font-bold text-[#3B66F5] tracking-[-1px]"
            >
              Agenda<span className="font-medium text-[#192A45]">Stay.</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 px-8 md:px-12 flex flex-col justify-center py-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}