import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 