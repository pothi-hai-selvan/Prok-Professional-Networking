import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    // If you use context, also clear user in context here
    navigate('/login');
  };
  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-900 shadow px-6 py-3">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-xl text-blue-700 dark:text-blue-300">P</span>
        <NavLink to="/app/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-semibold flex items-center" : "text-gray-700 flex items-center"}>
          {/* Dashboard icon */}
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V7H7v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2z" /></svg>
          Dashboard
        </NavLink>
        <NavLink to="/app/profile" className={({ isActive }) => isActive ? "text-blue-600 font-semibold flex items-center" : "text-gray-700 flex items-center"}>
          {/* Profile icon */}
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Profile
        </NavLink>
        <NavLink to="/app/posts" className={({ isActive }) => isActive ? "text-blue-600 font-semibold flex items-center" : "text-gray-700 flex items-center"}>
          {/* Posts icon */}
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
          Posts
        </NavLink>
        <NavLink to="/app/jobs" className={({ isActive }) => isActive ? "text-blue-600 font-semibold flex items-center" : "text-gray-700 flex items-center"}>
          {/* Jobs icon */}
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>
          Jobs
        </NavLink>
        <NavLink to="/app/messages" className={({ isActive }) => isActive ? "text-blue-600 font-semibold flex items-center" : "text-gray-700 flex items-center"}>
          {/* Messages icon */}
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4.286 1.072A1 1 0 013 19.13V17.7c0-.272.11-.534.305-.727C2.11 15.534 2 15.272 2 15V7a2 2 0 012-2h16a2 2 0 012 2v5z" /></svg>
          Messages
        </NavLink>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
          ) : (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>
        <span className="text-gray-700 dark:text-gray-200">Demo User</span>
        <button className="rounded-full overflow-hidden w-8 h-8 border-2 border-blue-600">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
        </button>
        <button className="text-gray-600 dark:text-gray-200 hover:text-blue-600 font-semibold" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
} 