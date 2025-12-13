import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Sidebar from './Sidebar';
import { useAppContext } from '../../context/AppContext';
import { LogOut, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

const Layout = () => {
  const navigate = useNavigate();
  const { setToken, theme, toggleTheme } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* NAVBAR */}
      <header
        className="
        flex items-center justify-between h-[70px] px-4 sm:px-10
        bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
        dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800
        shadow-lg transition-all"
      >

        {/* LEFT — Logo */}
        <img
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-40 cursor-pointer brightness-110 hover:brightness-125 transition"
          onClick={() => navigate('/')}
        />

        {/* CENTER — ADMIN PANEL TEXT */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 
          text-white text-xl sm:text-2xl font-semibold tracking-wide drop-shadow-lg">
          Admin Panel
        </h1>

        {/* RIGHT — ICONS */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              flex items-center gap-2 px-4 py-2 text-white font-medium text-sm
              bg-white/20 hover:bg-white/30 rounded-full 
              backdrop-blur-sm transition shadow-md hover:shadow-lg
            "
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* MAIN BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 transition-colors duration-300">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;
