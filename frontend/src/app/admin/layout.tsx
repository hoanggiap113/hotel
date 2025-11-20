"use client"
import React from 'react';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';
import AuthGuard from './_components/AuthGuard';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 border-r border-gray-200 bg-white">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <header>
          <Header />
        </header>
        <main className="flex-1 p-6">
          <AuthGuard>
          {children}
          </AuthGuard>
        </main>
      </div>
    </div>
  );
}