import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';

function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 shrink-0">
          <Profile />
        </div>
        <div className="w-full md:w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;