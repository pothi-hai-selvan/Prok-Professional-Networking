import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Full-screen background gradient for all pages */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 flex flex-col w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 